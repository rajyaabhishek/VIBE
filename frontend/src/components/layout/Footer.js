import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { title: 'About', url: '#' },
    { title: 'Community Guidelines', url: '#' },
    { title: 'Privacy & Terms', url: '#' },
    { title: 'Sales Solutions', url: '#' },
    { title: 'Safety Center', url: '#' },
    { title: 'Accessibility', url: '#' },
    { title: 'Careers', url: '#' },
    { title: 'Ad Choices', url: '#' },
    { title: 'Mobile', url: '#' },
    { title: 'Talent Solutions', url: '#' },
    { title: 'Marketing Solutions', url: '#' },
    { title: 'Advertising', url: '#' },
    { title: 'Small Business', url: '#' },
  ];
  
  return (
    <footer className="bg-white mt-8 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-4">
          <FaLinkedin className="h-8 w-8 text-linkedin-blue" />
        </div>
        
        <div className="flex flex-wrap justify-center text-xs text-gray-600 mb-4">
          {footerLinks.map((link, index) => (
            <div key={index} className="px-2 py-1">
              <a href={link.url} className="hover:text-linkedin-blue hover:underline">
                {link.title}
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center text-xs text-gray-500">
          <p>LinkedIn Corporation © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
