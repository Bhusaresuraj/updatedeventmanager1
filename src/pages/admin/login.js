import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';
import { adminLogin } from '../../services/adminApi';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await adminLogin(credentials);
      
      // Store the token
      localStorage.setItem('adminToken', data.token);
      document.cookie = `adminToken=${data.token}; path=/`;
      
      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError('Invalid credentials');
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
        <div className={styles.loginForm}>
          <h1>Admin Login</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value
              })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 