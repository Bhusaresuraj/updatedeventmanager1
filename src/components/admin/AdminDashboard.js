import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import { fetchStats } from '../../services/adminApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    teamMembers: 0,
    upcomingEvents: 0,
    services: 0
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    getStats();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Events</h3>
          <p>{stats.totalEvents}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Team Members</h3>
          <p>{stats.teamMembers}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Upcoming Events</h3>
          <p>{stats.upcomingEvents}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Services</h3>
          <p>{stats.services}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 