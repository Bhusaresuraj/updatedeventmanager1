import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/AdminLogin.module.css';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Simple credential check
      if (
        credentials.email === 'admin@example.com' && 
        credentials.password === 'admin123'
      ) {
        // Create token
        const token = btoa(Date.now().toString());
        
        // Store in localStorage for client-side checks
        localStorage.setItem('adminToken', token);
        
        // Store in cookie for server-side checks
        document.cookie = `adminToken=${token}; path=/; max-age=86400`;
        
        toast.success('Login successful!');
        router.push('/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid credentials');
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