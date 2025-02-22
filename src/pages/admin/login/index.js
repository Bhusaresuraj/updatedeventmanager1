import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/AdminLogin.module.css';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.replace('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        credentials.email === 'admin@example.com' && 
        credentials.password === 'admin123'
      ) {
        // Create token
        const token = btoa(`${Date.now()}-${credentials.email}`);
        
        // Set cookie
        document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Strict`;
        localStorage.setItem('adminToken', token);
        
        toast.success('Login successful!');

        // Use replace instead of push to avoid back button issues
        await router.replace('/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Blizzard Production</title>
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className={styles.hint}>
            <p>Login with:</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 