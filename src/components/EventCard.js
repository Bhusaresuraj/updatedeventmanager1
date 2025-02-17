import React from 'react';
import styles from './EventCard.module.css';
import Image from 'next/image';

const EventCard = ({ event, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.eventImage}>
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={300}
          objectFit="cover"
        />
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {children}
    </div>
  );
};

export default EventCard; 