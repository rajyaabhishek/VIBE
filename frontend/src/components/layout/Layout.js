
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Hide footer on these paths
  const hideFooterPaths = ['/messaging'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  // Check if this is the login, register, or home page without a user
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isHomeWithoutUser = location.pathname === '/' && !currentUser;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className={`main-content flex-grow ${!isAuthPage && !isHomeWithoutUser ? 'bg-linkedin-light' : 'bg-white'}`}>
        {children}
      </main>
      
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
