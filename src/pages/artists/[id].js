import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/artists/ArtistDetail.module.css';
import { 
  FaInstagram, 
  FaYoutube, 
  FaStar, 
  FaCalendar, 
  FaGuitar, 
  FaEnvelope, 
  FaPhone, 
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTrophy,
  FaMoneyBillWave
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Add getStaticPaths
export async function getStaticPaths() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artists`);
    const data = await response.json();

    const paths = data.data.map((artist) => ({
      params: { id: artist._id.toString() },
    }));

    return {
      paths,
      fallback: true // Set to 'blocking' if you want SSR for new paths
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true
    };
  }
}

// Change getServerSideProps to getStaticProps
export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artists/${params.id}`);
    const data = await response.json();
    
    if (!data.success) {
      return { notFound: true };
    }

    return {
      props: { 
        artist: data.data 
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    return { 
      notFound: true 
    };
  }
}

const ArtistDetail = ({ artist }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <>
      <Navbar />
      <main className={styles.artistDetail}>
        {/* Hero Section */}
        <motion.section 
          className={styles.heroSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.heroOverlay} />
          <img src={artist.profileImage} alt={artist.name} className={styles.heroImage} />
          <motion.div 
            className={styles.heroContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.artistStatus}>
              {artist.featured && <span className={styles.featuredBadge}><FaTrophy /> Featured Artist</span>}
              <span className={styles.statusBadge}>
                <FaCheckCircle /> {artist.associationStatus}
              </span>
            </div>
            <h1>{artist.name}</h1>
            <div className={styles.artistMeta}>
              <span className={styles.specialization}>{artist.specialization}</span>
              <span className={styles.artistType}>{artist.artistType}</span>
            </div>
          </motion.div>
        </motion.section>

        <div className={styles.mainContent}>
          {/* Quick Stats */}
          <motion.section 
            className={styles.statsSection}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.statCard}>
              <FaGuitar className={styles.statIcon} />
              <h3>{artist.experience}+ Years</h3>
              <p>Professional Experience</p>
            </div>
            <div className={styles.statCard}>
              <FaMoneyBillWave className={styles.statIcon} />
              <h3>₹{artist.basePrice.amount}</h3>
              <p>{artist.basePrice.unit}</p>
            </div>
            <div className={styles.statCard}>
              <FaClock className={styles.statIcon} />
              <h3>Availability</h3>
              <p>
                {[
                  artist.availability.weekdays && 'Weekdays',
                  artist.availability.weekends && 'Weekends'
                ].filter(Boolean).join(' & ')}
              </p>
            </div>
          </motion.section>

          {/* Bio and Contact */}
          <div className={styles.infoGrid}>
            <motion.section 
              className={styles.bioSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h2>About the Artist</h2>
              <p>{artist.bio}</p>
              
              <div className={styles.performanceInfo}>
                <h3>Performance Types</h3>
                <div className={styles.tags}>
                  {artist.performanceTypes.map((type, index) => (
                    <span key={index} className={styles.tag}>{type}</span>
                  ))}
                </div>
              </div>

              {artist.equipmentProvided && (
                <div className={styles.equipment}>
                  <FaCheckCircle /> Equipment Provided
                </div>
              )}
            </motion.section>

            <motion.section 
              className={styles.contactSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <h2>Contact Information</h2>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <div>
                    <h4>Phone</h4>
                    <p>{artist.phone}</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <div>
                    <h4>Email</h4>
                    <p>{artist.email}</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Gallery Section */}
          <motion.section 
            className={styles.gallerySection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <h2>Gallery</h2>
            <div className={styles.galleryGrid}>
              {artist.gallery.map((image, index) => (
                <motion.div 
                  key={index}
                  className={styles.galleryItem}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={`${artist.name}'s work ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Social and Videos */}
          <motion.section 
            className={styles.socialSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <h2>Connect & Watch</h2>
            <div className={styles.socialGrid}>
              {artist.instagramHandle && (
                <a 
                  href={artist.instagramHandle} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.socialCard} ${styles.instagram}`}
                >
                  <FaInstagram />
                  <span>Follow on Instagram</span>
                </a>
              )}
              {artist.youtubeLinks?.map((video, index) => (
                <a 
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialCard} ${styles.youtube}`}
                >
                  <FaYoutube />
                  <span>{video.title}</span>
                </a>
              ))}
            </div>
          </motion.section>

          {/* Additional Info */}
          <motion.section 
            className={styles.additionalInfo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className={styles.infoCard}>
              <p>Member since: {formatDate(artist.createdAt)}</p>
              <p>Last updated: {formatDate(artist.updatedAt)}</p>
            </div>
          </motion.section>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className={styles.modal} onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Gallery preview" />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ArtistDetail; 