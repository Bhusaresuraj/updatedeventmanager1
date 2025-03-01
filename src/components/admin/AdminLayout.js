import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './AdminLayout.module.css';
import { 
  FaHome, FaUsers, FaCalendarAlt, FaImages, 
  FaNewspaper, FaSignOutAlt, FaBars, FaComments,
  FaTimes 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Client-side auth check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FaUsers />, label: 'Team', path: '/admin/team' },
    { icon: <FaCalendarAlt />, label: 'Events', path: '/admin/events' },
    { icon: <FaImages />, label: 'Registrations', path: '/admin/registrations' },
    { icon: <FaNewspaper />, label: 'Services', path: '/admin/services' },
    { icon: <FaComments />, label: 'Testimonials', path: '/admin/testimonials' }
  ];

  const handleLogout = () => {
    // Clear both localStorage and cookie
    localStorage.removeItem('adminToken');
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.adminContainer}>
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button 
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className={`${styles.navItem} ${router.pathname === item.path ? styles.active : ''}`}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1>Admin Dashboard</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 