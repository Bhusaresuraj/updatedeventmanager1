import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Payment.module.css';
import { initiatePayment } from '../services/api';

const Payment = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (eventId) {
      // Fetch event details based on eventId
      const fetchEvent = async () => {
        try {
          const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`);
          const eventData = await data.json();
          setEvent(eventData);
        } catch (error) {
          console.error('Error fetching event:', error);
          setStatus('error');
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  const handlePayment = async () => {
    setStatus('loading');
    try {
      const paymentResponse = await initiatePayment(eventId);
      // Redirect to payment gateway URL
      window.location.href = paymentResponse.paymentUrl;
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  if (!event) {
    return (
      <>
        <Navbar />
        <main className={styles.paymentContainer}>
          <p className={styles.loading}>Loading event details...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.paymentContainer}>
        <h1>Payment for {event.title}</h1>
        <div className={styles.paymentDetails}>
          <p>Event Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location}</p>
          <p>Description: {event.description}</p>
        </div>
        <div className={styles.amount}>
          Amount: ${event.price}
        </div>
        <button 
          className={styles.paymentButton}
          onClick={handlePayment}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Processing...' : 'Pay Now'}
        </button>
        {status === 'error' && (
          <p className={`${styles.status} ${styles.error}`}>
            Payment failed. Please try again.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Payment; 