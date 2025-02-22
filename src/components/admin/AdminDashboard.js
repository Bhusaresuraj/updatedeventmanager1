import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { fetchStats } from '../../services/adminApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalArtists: 0,
    totalEnquiries: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard stats');
      console.error('Dashboard Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <div className={styles.managerContainer}>
      <h1>Admin Dashboard</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Events</h3>
          <p>{stats.totalEvents}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Upcoming Events</h3>
          <p>{stats.upcomingEvents}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Artists</h3>
          <p>{stats.totalArtists}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Enquiries</h3>
          <p>{stats.totalEnquiries}</p>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <button onClick={() => window.location.href = '/admin/events'}>
            Manage Events
          </button>
          <button onClick={() => window.location.href = '/admin/artists'}>
            Manage Artists
          </button>
          <button onClick={() => window.location.href = '/admin/gallery'}>
            Manage Gallery
          </button>
          <button onClick={() => window.location.href = '/admin/services'}>
            Manage Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 