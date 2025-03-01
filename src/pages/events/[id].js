import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/events/EventDetail.module.css';
import { motion } from 'framer-motion';
import { 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaTicketAlt,
  FaClock,
  FaImage
} from 'react-icons/fa';
import EventRegistration from '../../components/EventRegistration';

export async function getStaticPaths() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
    const data = await response.json();

    const paths = data.data.map((event) => ({
      params: { id: event._id.toString() },
    }));

    return {
      paths,
      fallback: true
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${params.id}`);
    const data = await response.json();
    
    if (!data.success) {
      return { notFound: true };
    }

    return {
      props: { 
        event: data.data 
      },
      revalidate: 60
    };
  } catch (error) {
    return { notFound: true };
  }
}

const EventDetail = ({ event }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const [showRegistration, setShowRegistration] = useState(false);

  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Navbar />
      <main className={styles.eventDetail}>
        <motion.section 
          className={styles.heroSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.heroOverlay} />
          <img src={event.bannerImage} alt={event.title} className={styles.heroImage} />
          <motion.div 
            className={styles.heroContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.eventStatus}>
              <span className={`${styles.status} ${styles[event.status]}`}>
                {event.status}
              </span>
              <span className={styles.category}>{event.category}</span>
            </div>
            <h1>{event.title}</h1>
            <p className={styles.shortDescription}>{event.shortDescription}</p>
          </motion.div>
        </motion.section>

        <div className={styles.mainContent}>
          <motion.section 
            className={styles.eventInfo}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <FaCalendar className={styles.infoIcon} />
                <h3>Date & Time</h3>
                <p>{formatDate(event.date)}</p>
              </div>
              <div className={styles.infoCard}>
                <FaMapMarkerAlt className={styles.infoIcon} />
                <h3>Location</h3>
                <p>{event.location}</p>
              </div>
              <div className={styles.infoCard}>
                <FaUsers className={styles.infoIcon} />
                <h3>Capacity</h3>
                <p>{event.registeredUsers}/{event.capacity} Registered</p>
              </div>
              <div className={styles.infoCard}>
                <FaTicketAlt className={styles.infoIcon} />
                <h3>Price</h3>
                <p>₹{event.price}</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2>About the Event</h2>
            <p>{event.description}</p>
          </motion.section>

          {event.gallery.length > 0 && (
            <motion.section 
              className={styles.gallery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <h2>Event Gallery</h2>
              <div className={styles.galleryGrid}>
                {event.gallery.map((image, index) => (
                  <motion.div 
                    key={index}
                    className={styles.galleryItem}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`Event gallery ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section 
            className={styles.registration}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className={styles.registrationCard}>
              <h2>Event Registration</h2>
              <div className={styles.registrationInfo}>
                <p>Spots Available: {event.capacity - event.registeredUsers}</p>
                <button 
                  className={styles.registerButton}
                  onClick={() => setShowRegistration(true)}
                >
                  Register Now
                </button>
              </div>
            </div>
          </motion.section>
        </div>

        {selectedImage && (
          <div className={styles.modal} onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Gallery preview" />
          </div>
        )}

        {showRegistration && (
          <EventRegistration 
            eventId={event._id} 
            eventPrice={event.price}
            onClose={() => setShowRegistration(false)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default EventDetail; 