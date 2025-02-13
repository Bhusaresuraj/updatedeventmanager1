import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';
import { submitFeedback } from '../services/api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await submitFeedback(formData);
      setStatus('Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to submit feedback.');
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Your Feedback"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Submit</button>
      <p>{status}</p>
    </form>
  );
};

export default FeedbackForm; 