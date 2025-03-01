import { useState } from 'react';
import styles from './AdminComponents.module.css';

const GalleryManager = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('image', file);
        await uploadImage(formData);
      }
      setSelectedFiles([]);
      alert('Images uploaded successfully!');
    } catch (err) {
      setError('Failed to upload images');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.managerContainer}>
      <h1>Gallery Management</h1>

      <form onSubmit={handleUpload} className={styles.form}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          required
        />
        <button type="submit" disabled={isLoading || selectedFiles.length === 0}>
          {isLoading ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {selectedFiles.length > 0 && (
        <div className={styles.previewGrid}>
          {selectedFiles.map((file, index) => (
            <div key={index} className={styles.previewCard}>
              <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager; 