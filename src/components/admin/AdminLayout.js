import { useState } from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.css';
import { FaHome, FaUsers, FaCalendarAlt, FaImages, FaNewspaper, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin' },
    { icon: <FaUsers />, label: 'Team Members', path: '/admin/team' },
    { icon: <FaCalendarAlt />, label: 'Events', path: '/admin/events' },
    { icon: <FaImages />, label: 'Gallery', path: '/admin/gallery' },
    { icon: <FaNewspaper />, label: 'Services', path: '/admin/services' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    Cookies.remove('adminToken', { path: '/' });
    window.location.href = '/admin/login?logout=true';
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.collapsed}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path} className={styles.navItem}>
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
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 