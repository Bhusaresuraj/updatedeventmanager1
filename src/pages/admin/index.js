import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1>Welcome to Admin Dashboard</h1>
        {/* Add your admin dashboard content here */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 