import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';
import Cookies from 'js-cookie';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Clear tokens only if there was a logout action
  useEffect(() => {
    if (router.query.logout === 'true') {
      localStorage.removeItem('adminToken');
      Cookies.remove('adminToken');
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For testing, use hardcoded credentials
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const mockToken = 'mock-token-123';
        
        // Set token in both localStorage and cookies
        localStorage.setItem('adminToken', mockToken);
        Cookies.set('adminToken', mockToken, { 
          expires: 7,
          path: '/',
          sameSite: 'strict'
        });

        // Use replace instead of push to avoid browser history issues
        router.replace('/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Blizzard Production House</title>
      </Head>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            disabled={isLoading}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className={styles.hint}>
            Use username: admin, password: admin123 for testing
          </p>
        </form>
      </div>
    </>
  );
};

export default AdminLogin; 