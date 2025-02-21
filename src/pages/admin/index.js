import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Admin.module.css';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminDashboard from '../../components/admin/AdminDashboard';

const AdminPanel = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default AdminPanel; 