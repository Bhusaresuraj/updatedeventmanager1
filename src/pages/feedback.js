import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';

const Feedback = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="feedback-page">
          <h1>Feedback</h1>
          <FeedbackForm />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Feedback; 