import React from 'react';
import styles from './EventCard.module.css';

const EventCard = ({ event, children }) => {
  return (
    <div className={styles.card}>
      <img src={event.image} alt={event.title} className={styles.image} />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {children}
    </div>
  );
};

export default EventCard; 