import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EnquiryButton from '../../components/EnquiryButton';
import { services } from '../../data/services';
import styles from '../../styles/ServiceDetail.module.css';

export async function getStaticPaths() {
  const paths = services.map((service) => ({
    params: { id: service.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const service = services.find((s) => s.id === params.id);
  
  // If service is not found, return notFound
  if (!service) {
    return {
      notFound: true, // This will show 404 page
    };
  }

  // Return the found service with all required fields
  return {
    props: {
      service: {
        id: service.id,
        title: service.title,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,
        image: service.image,
        features: service.features || [],
        benefits: service.benefits || [],
      },
    },
  };
}

const ServiceDetail = ({ service }) => {
  const router = useRouter();

  // Show loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Add error boundary
  if (!service) {
    return (
      <>
        <Navbar />
        <main className={styles.serviceDetail}>
          <div className="container">
            <h1>Service not found</h1>
            <button onClick={() => router.push('/services')}>
              Back to Services
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.serviceDetail}>
        <div className={styles.heroSection}>
          <img src={service.image} alt={service.title} />
          <div className={styles.heroContent}>
            <h1>{service.title}</h1>
            <p>{service.shortDescription}</p>
          </div>
        </div>

        <div className="container">
          <section className={styles.description}>
            <p>{service.fullDescription}</p>
          </section>

          <div className={styles.features}>
            <section className={styles.featuresList}>
              <h2>What We Offer</h2>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>

            <section className={styles.benefitsList}>
              <h2>Benefits</h2>
              <ul>
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className={styles.cta}>
            <h2>Ready to Plan Your Event?</h2>
            <EnquiryButton />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail; 