import React from 'react';
import styles from './Location.module.css';

const Location = () => {
  return (
    <section id="location" className={styles.locationSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Find Us Here</h2>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1701234567890!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location in Mumbai"
            className={styles.map}
          ></iframe>
        </div>
        
      </div>
    </section>
  );
};

export default Location; 