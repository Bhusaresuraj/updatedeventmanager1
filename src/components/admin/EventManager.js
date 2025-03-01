import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { toast } from 'react-hot-toast';
import UpdateEventModal from './UpdateEventModal';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    shortDescription: '',
    description: '',
    date: '',
    location: '',
    category: 'Cultural',
    price: '',
    capacity: '',
    status: 'upcoming',
    featured: false,
    organizer: {
      name: '',
      contact: ''
    },
    bannerImage: null,
    gallery: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      } else {
        throw new Error('Failed to load events');
      }
    } catch (err) {
      setError('Failed to load events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      // Add all text fields
      Object.keys(newEvent).forEach(key => {
        if (key === 'organizer') {
          formData.append(key, JSON.stringify(newEvent[key]));
        } else if (key !== 'bannerImage' && key !== 'gallery') {
          formData.append(key, newEvent[key]);
        }
      });
      
      // Add banner image
      if (newEvent.bannerImage) {
        formData.append('bannerImage', newEvent.bannerImage);
      }
      
      // Add gallery images
      if (newEvent.gallery.length > 0) {
        newEvent.gallery.forEach(image => {
          formData.append('gallery', image);
        });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      await loadEvents();
      setNewEvent({
        title: '',
        shortDescription: '',
        description: '',
        date: '',
        location: '',
        category: 'Cultural',
        price: '',
        capacity: '',
        status: 'upcoming',
        featured: false,
        organizer: {
          name: '',
          contact: ''
        },
        bannerImage: null,
        gallery: []
      });
      
      toast.success('Event created successfully!');
    } catch (err) {
      setError('Failed to add event');
      toast.error('Failed to create event');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.ok) {
          toast.success('Event deleted successfully');
          loadEvents(); // Reload the events list
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (err) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  const handleUpdateComplete = () => {
    loadEvents();
    setSelectedEvent(null);
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
          type="text"
          placeholder="Short Description"
          value={newEvent.shortDescription}
          onChange={(e) => setNewEvent({...newEvent, shortDescription: e.target.value})}
          required
        />
        <textarea
          placeholder="Full Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
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
        <select
          value={newEvent.category}
          onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
          required
        >
          <option value="Corporate">Corporate</option>
          <option value="Cultural">Cultural</option>
          <option value="Award">Award</option>
          <option value="Product">Product</option>
          <option value="Festival">Festival</option>
          <option value="Private">Private</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newEvent.price}
          onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newEvent.capacity}
          onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
          required
        />
        <div className={styles.organizerInfo}>
          <input
            type="text"
            placeholder="Organizer Name"
            value={newEvent.organizer.name}
            onChange={(e) => setNewEvent({
              ...newEvent, 
              organizer: {...newEvent.organizer, name: e.target.value}
            })}
            required
          />
          <input
            type="text"
            placeholder="Organizer Contact"
            value={newEvent.organizer.contact}
            onChange={(e) => setNewEvent({
              ...newEvent, 
              organizer: {...newEvent.organizer, contact: e.target.value}
            })}
            required
          />
        </div>
        <div className={styles.imageInputs}>
          <div>
            <label>Banner Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewEvent({...newEvent, bannerImage: e.target.files[0]})}
              required
            />
          </div>
          <div>
            <label>Gallery Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setNewEvent({...newEvent, gallery: Array.from(e.target.files)})}
            />
          </div>
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={newEvent.featured}
              onChange={(e) => setNewEvent({...newEvent, featured: e.target.checked})}
            />
            Featured Event
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>

      {/* Events List */}
      <div className={styles.eventsGrid}>
        <h2>Current Events</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event._id} className={styles.eventCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={event.bannerImage} 
                  alt={event.title}
                  className={styles.bannerImage}
                />
                <span className={styles.status}>{event.status}</span>
              </div>
              <div className={styles.cardContent}>
                <h3>{event.title}</h3>
                <p className={styles.shortDesc}>{event.shortDescription}</p>
                <div className={styles.eventDetails}>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Category:</strong> {event.category}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{event.price}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {event.capacity}
                  </p>
                  <p>
                    <strong>Registered:</strong> {event.registeredUsers}
                  </p>
                </div>
                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleDelete(event._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                  <button 
                    className={styles.editBtn}
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <UpdateEventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={handleUpdateComplete}
        />
      )}
    </div>
  );
};

export default EventManager; 