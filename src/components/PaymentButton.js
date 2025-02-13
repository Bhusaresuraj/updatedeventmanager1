import React from 'react';
import styles from './PaymentButton.module.css';

const PaymentButton = ({ eventId }) => {
  const handlePayment = () => {
    // Redirect to payment page with eventId
    window.location.href = `/payment?eventId=${eventId}`;
  };

  return (
    <button className={styles.paymentButton} onClick={handlePayment}>
      Pay Now
    </button>
  );
};

export default PaymentButton; 