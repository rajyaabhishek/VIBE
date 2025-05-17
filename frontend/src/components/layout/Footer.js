
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-6 mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <FaLinkedin className="h-8 w-8 text-linkedin-blue mr-2" />
            <span className="text-lg font-semibold">LinkedIn Clone</span>
          </div>
          <div className="flex flex-wrap justify-center">
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue mx-2 my-1 text-sm">
              About
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue mx-2 my-1 text-sm">
              Accessibility
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue mx-2 my-1 text-sm">
              Talent Solutions
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue mx-2 my-1 text-sm">
              Community Guidelines
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue mx-2 my-1 text-sm">
              Careers
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue mx-2 my-1 text-sm">
              Marketing Solutions
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-2 md:mb-0">
            &copy; {currentYear} LinkedIn Clone
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue text-sm">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue text-sm">
              User Agreement
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue text-sm">
              Cookie Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-linkedin-blue text-sm">
              Copyright Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
