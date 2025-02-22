import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './AdminLayout.module.css';
import { 
  FaHome, FaUsers, FaCalendarAlt, FaImages, 
  FaNewspaper, FaSignOutAlt, FaBars 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin' },
    { icon: <FaUsers />, label: 'Team', path: '/admin/team' },
    { icon: <FaCalendarAlt />, label: 'Events', path: '/admin/events' },
    { icon: <FaImages />, label: 'Gallery', path: '/admin/gallery' },
    { icon: <FaNewspaper />, label: 'Services', path: '/admin/services' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.toggleButton}
          >
            <FaBars />
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className={`${styles.navItem} ${router.pathname === item.path ? styles.active : ''}`}
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

      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <h1>Admin Dashboard</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 