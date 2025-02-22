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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In production, this should be an API call to your backend
      if (process.env.NODE_ENV === 'production') {
        // Example of how to hash the password before sending
        const hashedPassword = await hashPassword(credentials.password);
        
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials.email,
            password: hashedPassword
          })
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        
      } else {
        // Development-only direct check
        if (
          credentials.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
          credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {
          const token = btoa(Date.now().toString());
          localStorage.setItem('adminToken', token);
        } else {
          throw new Error('Invalid credentials');
        }
      }

      toast.success('Login successful!');
      router.push('/admin');
      
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Your Site Name</title>
        <meta name="robots" content="noindex,nofollow" />
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
                autoComplete="email"
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
                autoComplete="current-password"
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
          
          {process.env.NODE_ENV === 'development' && (
            <div className={styles.hint}>
              <p>Development Credentials:</p>
              <p>Email: {process.env.NEXT_PUBLIC_ADMIN_EMAIL}</p>
              <p>Password: {process.env.NEXT_PUBLIC_ADMIN_PASSWORD}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 