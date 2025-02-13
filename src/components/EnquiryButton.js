import React from 'react';
import styles from './EnquiryButton.module.css';

const EnquiryButton = () => {
  const handleEnquiry = () => {
    // Add country code and remove any spaces/special characters
    const phoneNumber = '919967825057'; // Added 91 for India's country code
    const message = 'Hello, I would like to make an enquiry about your events.';
    
    // Create the WhatsApp URL with properly encoded parameters
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button className={styles.enquiryButton} onClick={handleEnquiry}>
      Contact Us on WhatsApp
    </button>
  );
};

export default EnquiryButton; 