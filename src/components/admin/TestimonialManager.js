import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { toast } from 'react-toastify';
import AdminService from '../../services/adminService';
import { FaStar, FaStarHalf, FaImage, FaTrash, FaEdit } from 'react-icons/fa';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
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
      setIsAdding(false);
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className={styles.starFilled} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className={styles.starFilled} />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className={styles.starEmpty} />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className={styles.managerContainer}>
      <div className={styles.header}>
        <h1>Testimonials Management</h1>
        <button 
          className={styles.addButton}
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : '+ Add New Testimonial'}
        </button>
      </div>

      {isAdding && (
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <h2>Add New Testimonial</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter client's name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Role/Company</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="e.g. CEO at Company"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Testimonial Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Enter the testimonial text"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Rating</label>
                <div className={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                      key={num}
                      className={num <= formData.rating ? styles.starFilled : styles.starEmpty}
                      onClick={() => setFormData({...formData, rating: num})}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <FaImage /> Image URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton}>
                  Add Testimonial
                </button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.testimonialGrid}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <div className={styles.cardHeader}>
              {testimonial.image && (
                <img src={testimonial.image} alt={testimonial.name} />
              )}
              <div className={styles.headerContent}>
                <h3>{testimonial.name}</h3>
                <p className={styles.role}>{testimonial.role}</p>
                <div className={styles.rating}>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.content}>{testimonial.content}</p>
            </div>
            <div className={styles.cardActions}>
              <button 
                onClick={() => handleDelete(testimonial.id)}
                className={styles.deleteButton}
                title="Delete testimonial"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager; 