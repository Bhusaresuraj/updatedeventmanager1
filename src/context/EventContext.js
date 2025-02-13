import React, { createContext, useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({
    recent: [],
    upcoming: [],
  });

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents({
          recent: data.filter(event => event.status === 'recent'),
          upcoming: data.filter(event => event.status === 'upcoming'),
        });
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events }}>
      {children}
    </EventContext.Provider>
  );
}; 