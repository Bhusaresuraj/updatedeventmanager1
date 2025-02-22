import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';
import { toast } from 'react-toastify';
import AdminService from '../../services/adminService';
import { FaUser, FaLock } from 'react-icons/fa';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Log the attempt
      console.log('Login attempt with:', {
        email: credentials.email,
        expectedEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        passwordMatch: credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      });

      const data = await AdminService.login(credentials);
      
      // Store token
      localStorage.setItem('adminToken', data.token);
      
      // Show success message
      toast.success('Login successful! Redirecting...');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Blizzard Production House</title>
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Admin Email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FaLock className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className={styles.hint}>
            <p>Default Admin Credentials:</p>
            <p>Email: {process.env.NEXT_PUBLIC_ADMIN_EMAIL}</p>
            <p>Password: {process.env.NEXT_PUBLIC_ADMIN_PASSWORD}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 