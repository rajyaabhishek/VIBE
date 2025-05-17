
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import AboutSection from '../components/profile/AboutSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import EducationSection from '../components/profile/EducationSection';
import SkillsSection from '../components/profile/SkillsSection';
import { getUserById } from '../utils/mockData';

const ProfilePage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real app, we would fetch this from an API
    try {
      const user = getUserById(parseInt(id)) || currentUser;
      setProfileUser(user);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  }, [id, currentUser]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-linkedin-blue"></div>
      </div>
    );
  }
  
  if (error || !profileUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error || 'Profile not found'}
        </div>
      </div>
    );
  }
  
  const isCurrentUser = currentUser?.id === profileUser.id;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <ProfileHeader user={profileUser} isCurrentUser={isCurrentUser} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <AboutSection user={profileUser} isCurrentUser={isCurrentUser} />
        </div>
        
        <div className="lg:col-span-3">
          <ExperienceSection user={profileUser} isCurrentUser={isCurrentUser} />
        </div>
        
        <div className="lg:col-span-3">
          <EducationSection user={profileUser} isCurrentUser={isCurrentUser} />
        </div>
        
        <div className="lg:col-span-3">
          <SkillsSection user={profileUser} isCurrentUser={isCurrentUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
