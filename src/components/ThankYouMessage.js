import React, { useState, useEffect } from 'react';
import styles from './ThankYouMessage.module.css';

const ThankYouMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (footerPosition < windowHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.messageContainer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.message}>
        Thank you for visiting our website! 🎉
      </div>
    </div>
  );
};

export default ThankYouMessage; 