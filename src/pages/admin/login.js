import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fixed credentials for production
    const ADMIN_EMAIL = 'admin@example.com';
    const ADMIN_PASSWORD = 'admin123';

    try {
      if (
        credentials.email === ADMIN_EMAIL && 
        credentials.password === ADMIN_PASSWORD
      ) {
        // Create and store token
        const token = btoa(`${Date.now()}-${credentials.email}`);
        localStorage.setItem('adminToken', token);
        
        // Set cookie for SSR auth
        document.cookie = `adminToken=${token}; path=/; max-age=86400`;
        
        toast.success('Login successful!');
        
        // Redirect to admin dashboard
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Blizzard Production</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Email"
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
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
          
          <div className={styles.hint}>
            <p>Admin Credentials:</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 