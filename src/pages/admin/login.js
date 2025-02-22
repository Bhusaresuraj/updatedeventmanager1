import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';
import { toast } from 'react-toastify';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        credentials.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
        credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ) {
        const token = btoa(Date.now().toString());
        localStorage.setItem('adminToken', token);
        toast.success('Login successful!');
        router.push('/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div className={styles.hint}>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 