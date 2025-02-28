import { useState } from 'react';
import styles from './AdminComponents.module.css';
import { toast } from 'react-hot-toast';

const UpdateEventModal = ({ event, onClose, onUpdate }) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    title: event.title,
    shortDescription: event.shortDescription,
    bannerImage: null,
    gallery: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', updatedEvent.title);
      formData.append('shortDescription', updatedEvent.shortDescription);
      
      // Add banner image if selected
      if (updatedEvent.bannerImage) {
        formData.append('bannerImage', updatedEvent.bannerImage);
      }
      
      // Add gallery images if selected
      if (updatedEvent.gallery.length > 0) {
        updatedEvent.gallery.forEach(image => {
          formData.append('gallery', image);
        });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${event._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      toast.success('Event updated successfully');
      onUpdate();
      onClose();
    } catch (err) {
      toast.error('Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.eventModal}>
        <h2>Update Event</h2>
        <form onSubmit={handleSubmit} className={styles.eventUpdateForm}>
          <div className={styles.eventFormGroup}>
            <label>Title:</label>
            <input
              type="text"
              value={updatedEvent.title}
              onChange={(e) => setUpdatedEvent({...updatedEvent, title: e.target.value})}
              required
            />
          </div>

          <div className={styles.eventFormGroup}>
            <label>Short Description:</label>
            <textarea
              value={updatedEvent.shortDescription}
              onChange={(e) => setUpdatedEvent({...updatedEvent, shortDescription: e.target.value})}
              required
            />
          </div>

          <div className={styles.eventFormGroup}>
            <label>Banner Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUpdatedEvent({...updatedEvent, bannerImage: e.target.files[0]})}
            />
            {event.bannerImage && (
              <img 
                src={event.bannerImage} 
                alt="Current banner" 
                className={styles.previewImage}
              />
            )}
          </div>

          <div className={styles.eventFormGroup}>
            <label>Gallery Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUpdatedEvent({...updatedEvent, gallery: Array.from(e.target.files)})}
            />
            <div className={styles.galleryPreview}>
              {event.gallery?.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Gallery ${index + 1}`} 
                  className={styles.previewImage}
                />
              ))}
            </div>
          </div>

          <div className={styles.eventModalActions}>
            <button 
              type="button" 
              onClick={onClose}
              className={styles.eventCancelBtn}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.eventSubmitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal; 