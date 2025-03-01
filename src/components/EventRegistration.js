import React, { useState } from 'react';
import styles from '../styles/components/EventRegistration.module.css';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const EventRegistration = ({ eventId, onClose, eventPrice }) => {
  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      phone: ''
    },
    attendeeDetails: [{
      name: '',
      email: '',
      phone: '',
      address: ''
    }]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e, field, index = 0) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (field === 'user') {
        return {
          ...prev,
          user: { ...prev.user, [name]: value }
        };
      } else {
        const newAttendeeDetails = [...prev.attendeeDetails];
        newAttendeeDetails[index] = {
          ...newAttendeeDetails[index],
          [name]: value
        };
        return {
          ...prev,
          attendeeDetails: newAttendeeDetails
        };
      }
    });
  };

  const initializeRazorpay = (orderData) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Event Registration",
      description: "Event Registration Payment",
      order_id: orderData.orderId,
      handler: async function (response) {
        try {
          // Verify payment with your backend
          const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/registrations/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              tempTicketId: orderData.tempTicketId
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            setSuccess(true);
            setTimeout(() => {
              onClose();
            }, 2000);
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (err) {
          setError('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: formData.user.name,
        email: formData.user.email,
        contact: formData.user.phone,
      },
      theme: {
        color: "#0070f3"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
      setError('Payment failed. Please try again.');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Add user details
      formDataToSend.append('user[name]', formData.user.name);
      formDataToSend.append('user[email]', formData.user.email);
      formDataToSend.append('user[phone]', formData.user.phone);
      formDataToSend.append('event', eventId);

      // Add attendee details
      formData.attendeeDetails.forEach((attendee, index) => {
        Object.entries(attendee).forEach(([key, value]) => {
          formDataToSend.append(`attendeeDetails[${index}][${key}]`, value);
        });
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/registrations/initiate`, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Initialize Razorpay with the order data
      initializeRazorpay(data.data);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div 
        className={styles.formContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        {success ? (
          <div className={styles.success}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2>Payment Successful! 🎉</h2>
              <p>Your registration is confirmed. We'll see you at the event!</p>
            </motion.div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Event Registration</h2>
            
            <div className={styles.section}>
              <h3>Primary Contact</h3>
              <div className={styles.inputGroup}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.user.name}
                  onChange={(e) => handleChange(e, 'user')}
                />
              </div>
              <div className={styles.inputGroup}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.user.email}
                  onChange={(e) => handleChange(e, 'user')}
                />
              </div>
              <div className={styles.inputGroup}>
                <FaPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.user.phone}
                  onChange={(e) => handleChange(e, 'user')}
                />
              </div>
            </div>

            <div className={styles.section}>
              <h3>Attendee Details</h3>
              <div className={styles.inputGroup}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Attendee Name"
                  required
                  value={formData.attendeeDetails[0].name}
                  onChange={(e) => handleChange(e, 'attendee')}
                />
              </div>
              <div className={styles.inputGroup}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Attendee Email"
                  required
                  value={formData.attendeeDetails[0].email}
                  onChange={(e) => handleChange(e, 'attendee')}
                />
              </div>
              <div className={styles.inputGroup}>
                <FaPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Attendee Phone"
                  required
                  value={formData.attendeeDetails[0].phone}
                  onChange={(e) => handleChange(e, 'attendee')}
                />
              </div>
              <div className={styles.inputGroup}>
                <FaMapMarkerAlt className={styles.inputIcon} />
                <input
                  type="text"
                  name="address"
                  placeholder="Attendee Address"
                  required
                  value={formData.attendeeDetails[0].address}
                  onChange={(e) => handleChange(e, 'attendee')}
                />
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default EventRegistration; 