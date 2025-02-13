import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { EventContext } from '../context/EventContext';

const Events = () => {
  const { events } = useContext(EventContext);

  return (
    <>
      <Navbar />
      <main>
        <section id="all-events">
          <h1>All Events</h1>
          <div className="events-container">
            {events.upcoming.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Events; 