import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { toast } from 'react-toastify';
import AdminService from '../../services/adminService';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: ''
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await AdminService.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTestimonial = await AdminService.addTestimonial(formData);
      setTestimonials([...testimonials, newTestimonial]);
      setFormData({ name: '', role: '', content: '', rating: 5, image: '' });
      toast.success('Testimonial added successfully!');
    } catch (error) {
      toast.error('Failed to add testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await AdminService.deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading testimonials...</div>;
  }

  return (
    <div className={styles.managerContainer}>
      <h1>Manage Testimonials</h1>

      <div className={styles.form}>
        <h2>Add New Testimonial</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Role/Company</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Testimonial</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image URL (optional)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Testimonial
          </button>
        </form>
      </div>

      <div className={styles.grid}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.card}>
            {testimonial.image && (
              <img src={testimonial.image} alt={testimonial.name} />
            )}
            <div className={styles.cardContent}>
              <h3>{testimonial.name}</h3>
              <p className={styles.role}>{testimonial.role}</p>
              <p className={styles.content}>{testimonial.content}</p>
              <div className={styles.rating}>
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
              <button 
                onClick={() => handleDelete(testimonial.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager; 