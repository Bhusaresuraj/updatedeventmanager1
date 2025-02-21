import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { manageArtist } from '../../services/adminApi';

const ArtistManager = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: '',
    specialty: '',
    image: '',
    achievements: '',
    instagram: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const response = await fetch('/api/admin/artists');
      const data = await response.json();
      setArtists(data);
    } catch (err) {
      setError('Failed to load artists');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await manageArtist(newArtist);
      loadArtists();
      setNewArtist({
        name: '',
        specialty: '',
        image: '',
        achievements: '',
        instagram: ''
      });
    } catch (err) {
      setError('Failed to add artist');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artist?')) {
      try {
        await manageArtist({ id }, 'DELETE');
        loadArtists();
      } catch (err) {
        setError('Failed to delete artist');
      }
    }
  };

  return (
    <div className={styles.managerContainer}>
      <h1>Artist Management</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Artist Name"
          value={newArtist.name}
          onChange={(e) => setNewArtist({...newArtist, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Specialty"
          value={newArtist.specialty}
          onChange={(e) => setNewArtist({...newArtist, specialty: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Achievements"
          value={newArtist.achievements}
          onChange={(e) => setNewArtist({...newArtist, achievements: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Instagram Handle"
          value={newArtist.instagram}
          onChange={(e) => setNewArtist({...newArtist, instagram: e.target.value})}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewArtist({...newArtist, image: e.target.files[0]})}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Artist'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {artists.map(artist => (
          <div key={artist.id} className={styles.card}>
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
            <p>{artist.specialty}</p>
            <p>{artist.achievements}</p>
            <div className={styles.actions}>
              <button onClick={() => handleDelete(artist.id)}>Delete</button>
              <a 
                href={artist.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.instagramLink}
              >
                Instagram
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistManager; 