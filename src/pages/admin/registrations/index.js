import { useState, useEffect } from 'react';
import { FaUser, FaCalendar, FaMapMarkerAlt, FaQrcode, FaTicketAlt, FaClock } from 'react-icons/fa';
import styles from '../../../styles/admin/Registrations.module.css';
import AdminLayout from '../../../components/admin/AdminLayout';
const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/registrations`);
      const data = await response.json();
      setRegistrations(data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch registrations');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <AdminLayout>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Registration Management</h1>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Total Registrations</h3>
            <p>{registrations.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Pending</h3>
            <p>{registrations.filter(r => r.status === 'pending').length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Completed</h3>
            <p>{registrations.filter(r => r.status === 'completed').length}</p>
          </div>
        </div>
      </header>

      <div className={styles.registrationsGrid}>
        {registrations.map((registration) => (
          <div 
            key={registration._id} 
            className={styles.registrationCard}
            onClick={() => setSelectedRegistration(registration)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.eventInfo}>
                <h2>{registration.event.title}</h2>
                <span className={styles.ticketId}>
                  <FaTicketAlt /> {registration.ticketId}
                </span>
              </div>
              <span className={`${styles.status} ${styles[registration.status]}`}>
                {registration.status}
              </span>
            </div>

            <div className={styles.userInfo}>
              <div className={styles.infoItem}>
                <FaUser />
                <div>
                  <h3>{registration.user.name}</h3>
                  <p>{registration.user.email}</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FaCalendar />
                <div>
                  <h3>Event Date</h3>
                  <p>{formatDate(registration.event.date)}</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt />
                <div>
                  <h3>Location</h3>
                  <p>{registration.event.location}</p>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.qrCode}>
                <img src={registration.qrCodeImage} alt="QR Code" />
              </div>
              <div className={styles.timestamp}>
                <FaClock />
                <p>Registered on {formatDate(registration.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRegistration && (
        <div 
          className={styles.modal}
          onClick={(e) => e.target === e.currentTarget && setSelectedRegistration(null)}
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedRegistration(null)}
            >
              ×
            </button>
            <img 
              src={selectedRegistration.ticketImage} 
              alt="Ticket" 
              className={styles.ticketImage}
            />
            <div className={styles.attendeeDetails}>
              <h2>Attendee Details</h2>
              {selectedRegistration.attendeeDetails.map((attendee, index) => (
                <div key={index} className={styles.attendeeCard}>
                  <h3>{attendee.name}</h3>
                  <p>{attendee.email}</p>
                  <p>{attendee.phone}</p>
                  <p>{attendee.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default RegistrationsPage; 