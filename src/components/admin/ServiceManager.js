import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { fetchServices, updateService } from '../../services/adminApi';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
    }
  };

  const handleUpdate = async (service) => {
    try {
      await updateService(service);
      loadServices();
      setEditingService(null);
    } catch (err) {
      setError('Failed to update service');
    }
  };

  return (
    <div className={styles.managerContainer}>
      <h1>Service Management</h1>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.grid}>
        {services.map(service => (
          <div key={service.id} className={styles.card}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button onClick={() => setEditingService(service)}>
              Edit Service
            </button>
          </div>
        ))}
      </div>

      {editingService && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Service</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingService);
            }}>
              <input
                type="text"
                value={editingService.title}
                onChange={(e) => setEditingService({
                  ...editingService,
                  title: e.target.value
                })}
              />
              <textarea
                value={editingService.description}
                onChange={(e) => setEditingService({
                  ...editingService,
                  description: e.target.value
                })}
              />
              <div className={styles.modalActions}>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditingService(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager; 