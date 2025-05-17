
import requests
import sys
import json
from datetime import datetime

class LinkedInAPITester:
    def __init__(self, base_url="https://e1fa39d6-4ce3-485d-a41e-68468bbf6bc2.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_credentials = {
            "email": "john.doe@example.com",
            "password": "password123"
        }

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if not headers:
            headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                    return False, response.json()
                except:
                    return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_login(self):
        """Test login and get token"""
        success, response = self.run_test(
            "Login",
            "POST",
            "api/auth/login",
            200,
            data=self.user_credentials
        )
        if success and 'token' in response:
            self.token = response['token']
            return True
        return False

    def test_get_current_user(self):
        """Test getting current user profile"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "api/users/me",
            200
        )
        return success

    def test_get_jobs(self):
        """Test getting job listings"""
        success, response = self.run_test(
            "Get Jobs",
            "GET",
            "api/jobs",
            200
        )
        return success, response

    def test_get_job_by_id(self, job_id=1):
        """Test getting a specific job"""
        success, response = self.run_test(
            f"Get Job by ID ({job_id})",
            "GET",
            f"api/jobs/{job_id}",
            200
        )
        return success

    def test_get_conversations(self):
        """Test getting user conversations"""
        success, response = self.run_test(
            "Get Conversations",
            "GET",
            "api/conversations",
            200
        )
        return success, response

    def test_get_messages(self, conversation_id=1):
        """Test getting messages for a conversation"""
        success, response = self.run_test(
            f"Get Messages for Conversation ({conversation_id})",
            "GET",
            f"api/conversations/{conversation_id}/messages",
            200
        )
        return success

    def test_send_message(self, conversation_id=1):
        """Test sending a message"""
        data = {
            "content": f"Test message sent at {datetime.now().isoformat()}"
        }
        success, response = self.run_test(
            f"Send Message to Conversation ({conversation_id})",
            "POST",
            f"api/conversations/{conversation_id}/messages",
            201,
            data=data
        )
        return success

    def test_get_connections(self):
        """Test getting user connections"""
        success, response = self.run_test(
            "Get Connections",
            "GET",
            "api/network/connections",
            200
        )
        return success

    def test_get_connection_suggestions(self):
        """Test getting connection suggestions"""
        success, response = self.run_test(
            "Get Connection Suggestions",
            "GET",
            "api/network/suggestions",
            200
        )
        return success

def main():
    # Setup
    tester = LinkedInAPITester()
    
    # Run tests
    print("\n===== TESTING LINKEDIN CLONE API =====\n")
    
    # Test authentication
    print("\n----- Authentication Tests -----")
    if not tester.test_login():
        print("❌ Login failed, stopping tests")
        return 1
    
    tester.test_get_current_user()
    
    # Test jobs functionality
    print("\n----- Jobs Tests -----")
    jobs_success, jobs_data = tester.test_get_jobs()
    if jobs_success and jobs_data and len(jobs_data) > 0:
        job_id = jobs_data[0].get('id', 1)
        tester.test_get_job_by_id(job_id)
    else:
        tester.test_get_job_by_id()
    
    # Test messaging functionality
    print("\n----- Messaging Tests -----")
    conv_success, conv_data = tester.test_get_conversations()
    if conv_success and conv_data and len(conv_data) > 0:
        conv_id = conv_data[0].get('id', 1)
        tester.test_get_messages(conv_id)
        tester.test_send_message(conv_id)
    else:
        tester.test_get_messages()
        tester.test_send_message()
    
    # Test network functionality
    print("\n----- Network Tests -----")
    tester.test_get_connections()
    tester.test_get_connection_suggestions()
    
    # Print results
    print(f"\n===== TEST RESULTS =====")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run} ({tester.tests_passed/tester.tests_run*100:.1f}%)")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
