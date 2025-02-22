import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    // Client-side auth check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [router]);

  return (
    <AdminLayout>
      <div>
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 