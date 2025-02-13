import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { services } from '../../data/services';
import styles from '../../styles/Services.module.css';

const ServicesPage = () => {
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
                  href={`/services/${service.id}`} 
                  key={service.id}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceImage}>
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className={styles.serviceInfo}>
                    <h2>{service.title}</h2>
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