import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/Services.module.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections`);
        console.log('Response:', response);
        const data = await response.json();
        console.log('Data received:', data);
        
        if (data.success) {
          setServices(data.data);
          console.log('Services set:', data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    console.log('Loading state...');
    return <div>Loading...</div>;
  }
  
  if (error) {
    console.log('Error state:', error);
    return <div>Error: {error}</div>;
  }

  console.log('Rendering services:', services);

  return (
    <>
      <Navbar />
      <main className={styles.servicesPage}>
        <section className={styles.servicesHero}>
          <div className="container">
            <h1>Our Services</h1>
            <p>Discover our range of event management solutions</p>
          </div>
        </section>

        <section className={styles.servicesGrid}>
          <div className="container">
            <div className={styles.grid}>
              {services.map((service) => (
                <Link 
                  href={`/services/${service._id}`}
                  key={service._id}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceImage}>
                    <img src={service.bannerImage} alt={service.name} />
                  </div>
                  <div className={styles.serviceInfo}>
                    <h2>{service.name}</h2>
                    <p>{service.shortDescription}</p>
                    <span className={styles.readMore}>Learn More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage; 