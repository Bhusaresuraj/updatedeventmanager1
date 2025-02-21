import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../../services/adminApi';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    type: 'upcoming', // or 'recent'
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addEvent(newEvent);
      loadEvents();
      setNewEvent({ title: '', date: '', location: '', description: '', type: 'upcoming', image: '' });
    } catch (err) {
      setError('Failed to add event');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        loadEvents();
      } catch (err) {
        setError('Failed to delete event');
      }
    }
  };

  const handleEdit = async (event) => {
    try {
      await updateEvent(event);
      loadEvents();
    } catch (err) {
      setError('Failed to update event');
    }
  };

  return (
    <div className={styles.managerContainer}>
      <h1>Event Management</h1>
      
      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
          required
        />
        <select
          value={newEvent.type}
          onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
        >
          <option value="upcoming">Upcoming</option>
          <option value="recent">Recent</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewEvent({...newEvent, image: e.target.files[0]})}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Event'}
        </button>
      </form>

      {/* Events List */}
      <div className={styles.listContainer}>
        <h2>Current Events</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.grid}>
          {events.map(event => (
            <div key={event.id} className={styles.card}>
              <img src={event.image} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
              <div className={styles.actions}>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
                <button onClick={() => handleEdit(event)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventManager; 