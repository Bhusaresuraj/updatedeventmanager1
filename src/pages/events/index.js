import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/events/Events.module.css';
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaTicketAlt } from 'react-icons/fa';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <main className={styles.eventsPage}>
        <motion.section 
          className={styles.heroSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.heroContent}>
            <h1>Upcoming Events</h1>
            <p>Join us for unforgettable experiences</p>
          </div>
        </motion.section>

        <section className={styles.eventsGrid}>
          <div className={styles.container}>
            {events.map((event) => (
              <motion.div
                key={event._id}
                className={styles.eventCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/events/${event._id}`}>
                  <div className={styles.eventImage}>
                    <img src={event.bannerImage} alt={event.title} />
                    <div className={styles.eventStatus}>
                      <span className={`${styles.status} ${styles[event.status]}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className={styles.eventContent}>
                    <h2>{event.title}</h2>
                    <p className={styles.shortDescription}>{event.shortDescription}</p>
                    
                    <div className={styles.eventMeta}>
                      <div className={styles.metaItem}>
                        <FaCalendar />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FaMapMarkerAlt />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className={styles.eventFooter}>
                      <div className={styles.capacity}>
                        <FaUsers />
                        <span>{event.registeredUsers}/{event.capacity} registered</span>
                      </div>
                      <div className={styles.price}>
                        <FaTicketAlt />
                        <span>₹{event.price}</span>
                      </div>
                    </div>

                    <div className={styles.category}>
                      <span>{event.category}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EventsPage; 