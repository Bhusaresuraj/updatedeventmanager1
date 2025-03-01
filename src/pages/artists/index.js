import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/artists/Artists.module.css';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artists`);
        const data = await response.json();
        
        if (data.success) {
          setArtists(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch artists');
        }
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <main className={styles.artistsPage}>
        <section className={styles.heroSection}>
          <h1>Our Artists</h1>
          <p>Discover talented performers for your next event</p>
        </section>

        <section className={styles.artistsGrid}>
          {artists.map((artist) => (
            <Link href={`/artists/${artist._id}`} key={artist._id} className={styles.artistCard}>
              <div className={styles.artistImage}>
                <img src={artist.profileImage} alt={artist.name} />
                {artist.featured && <span className={styles.featuredBadge}>Featured</span>}
              </div>
              <div className={styles.artistInfo}>
                <h2>{artist.name}</h2>
                <p className={styles.specialization}>{artist.specialization}</p>
                <p className={styles.artistType}>{artist.artistType}</p>
                <div className={styles.artistMeta}>
                  <span>{artist.experience} Years Experience</span>
                  <span>₹{artist.basePrice.amount} {artist.basePrice.unit}</span>
                </div>
                <div className={styles.socialLinks}>
                  {artist.instagramHandle && (
                    <a href={artist.instagramHandle} target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </a>
                  )}
                  {artist.youtubeLinks && artist.youtubeLinks.length > 0 && (
                    <a href={artist.youtubeLinks[0].url} target="_blank" rel="noopener noreferrer">
                      <FaYoutube />
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ArtistsPage; 