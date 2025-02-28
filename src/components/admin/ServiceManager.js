import { useState, useEffect } from 'react';
import styles from './AdminComponents.module.css';
import { toast } from 'react-hot-toast';
import UpdateServiceModal from './UpdateServiceModal';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validServiceNames] = useState([
    'Artist Management',
    'Venue Management',
    'Event Planning',
    'Marketing',
    'Ticketing',
    'Production',
    'Sponsorship',
    'HR',
    'Finance'
  ]);
  const [newService, setNewService] = useState({
    name: validServiceNames[0],
    shortDescription: '',
    description: '',
    formLink: '',
    whatsappLink: [
      { title: '', url: '', description: '' },
      { title: '', url: '', description: '' }
    ],
    additionalContent: {
      contactEmail: '',
      officeHours: ''
    },
    bannerImage: null,
    media: []
  });
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (err) {
      setError('Failed to load services');
      toast.error('Failed to load services');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Add basic fields
      formData.append('name', newService.name);
      formData.append('shortDescription', newService.shortDescription);
      formData.append('description', newService.description);
      formData.append('formLink', newService.formLink);

      // Add WhatsApp links
      newService.whatsappLink.forEach((link, index) => {
        formData.append(`whatsappLink[${index}][title]`, link.title);
        formData.append(`whatsappLink[${index}][url]`, link.url);
        formData.append(`whatsappLink[${index}][description]`, link.description);
      });

      // Add additional content
      formData.append('additionalContent', JSON.stringify(newService.additionalContent));

      // Add banner image
      if (newService.bannerImage) {
        formData.append('bannerImage', newService.bannerImage);
      }

      // Add media files - allow multiple files
      if (newService.media.length > 0) {
        // Append each media file separately with the same key name
        newService.media.forEach(file => {
          formData.append('media', file);
        });
      }

      // Log FormData contents
      console.log('Form Data Contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create service');
      }

      toast.success('Service created successfully');
      setNewService({
        name: validServiceNames[0],
        shortDescription: '',
        description: '',
        formLink: '',
        whatsappLink: [
          { title: '', url: '', description: '' },
          { title: '', url: '', description: '' }
        ],
        additionalContent: {
          contactEmail: '',
          officeHours: ''
        },
        bannerImage: null,
        media: []
      });
      loadServices();
    } catch (err) {
      console.error('Error details:', err);
      toast.error(err.message || 'Failed to create service');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewService({
      name: validServiceNames[0],
      shortDescription: '',
      description: '',
      formLink: '',
      whatsappLink: [
        { title: '', url: '', description: '' },
        { title: '', url: '', description: '' }
      ],
      additionalContent: {
        contactEmail: '',
        officeHours: ''
      },
      bannerImage: null,
      media: []
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.ok) {
          toast.success('Service deleted successfully');
          loadServices();
        } else {
          throw new Error('Failed to delete service');
        }
      } catch (err) {
        toast.error('Failed to delete service');
      }
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
  };

  const handleUpdateComplete = () => {
    loadServices();
    setSelectedService(null);
  };

  return (
    <div className={styles.managerContainer}>
      <h1>Service Management</h1>

      {/* Create Service Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <select
            value={newService.name}
            onChange={(e) => setNewService({...newService, name: e.target.value})}
            required
            className={styles.select}
          >
            {validServiceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <textarea
            placeholder="Short Description"
            value={newService.shortDescription}
            onChange={(e) => setNewService({...newService, shortDescription: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            placeholder="Full Description"
            value={newService.description}
            onChange={(e) => setNewService({...newService, description: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="url"
            placeholder="Form Link"
            value={newService.formLink}
            onChange={(e) => setNewService({...newService, formLink: e.target.value})}
            required
          />
        </div>

        {/* WhatsApp Links */}
        {newService.whatsappLink.map((link, index) => (
          <div key={index} className={styles.whatsappLinkGroup}>
            <h3>WhatsApp Link {index + 1}</h3>
            <input
              type="text"
              placeholder="Title"
              value={link.title}
              onChange={(e) => {
                const updatedLinks = [...newService.whatsappLink];
                updatedLinks[index].title = e.target.value;
                setNewService({...newService, whatsappLink: updatedLinks});
              }}
              required
            />
            <input
              type="url"
              placeholder="URL"
              value={link.url}
              onChange={(e) => {
                const updatedLinks = [...newService.whatsappLink];
                updatedLinks[index].url = e.target.value;
                setNewService({...newService, whatsappLink: updatedLinks});
              }}
              required
            />
            <textarea
              placeholder="Description"
              value={link.description}
              onChange={(e) => {
                const updatedLinks = [...newService.whatsappLink];
                updatedLinks[index].description = e.target.value;
                setNewService({...newService, whatsappLink: updatedLinks});
              }}
              required
            />
          </div>
        ))}

        {/* Additional Content */}
        <div className={styles.formGroup}>
          <h3>Additional Content</h3>
          <input
            type="email"
            placeholder="Contact Email"
            value={newService.additionalContent.contactEmail}
            onChange={(e) => setNewService({
              ...newService,
              additionalContent: {
                ...newService.additionalContent,
                contactEmail: e.target.value
              }
            })}
            required
          />
          <input
            type="text"
            placeholder="Office Hours"
            value={newService.additionalContent.officeHours}
            onChange={(e) => setNewService({
              ...newService,
              additionalContent: {
                ...newService.additionalContent,
                officeHours: e.target.value
              }
            })}
            required
          />
        </div>

        {/* File Uploads */}
        <div className={styles.formGroup}>
          <label>Banner Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewService({...newService, bannerImage: e.target.files[0]})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Media Files (Select multiple):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNewService({...newService, media: Array.from(e.target.files)})}
            required
          />
          {newService.media.length > 0 && (
            <div className={styles.mediaPreview}>
              {Array.from(newService.media).map((file, index) => (
                <div key={index} className={styles.previewItem}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className={styles.previewImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Service...' : 'Create Service'}
        </button>
      </form>

      {/* Services List */}
      <div className={styles.servicesGrid}>
        <h2>Current Services</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service._id} className={styles.serviceCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={service.bannerImage} 
                  alt={service.name}
                  className={styles.bannerImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{service.name}</h3>
                <p className={styles.shortDesc}>{service.shortDescription}</p>
                
                {/* WhatsApp Groups */}
                <div className={styles.whatsappGroups}>
                  <h4>WhatsApp Groups:</h4>
                  {service.whatsappLink.map((link, index) => (
                    <div key={link._id} className={styles.whatsappLink}>
                      <p className={styles.groupTitle}>{link.title}</p>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Join Group
                      </a>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className={styles.additionalInfo}>
                  <p><strong>Contact:</strong> {service.additionalContent.contactEmail}</p>
                  <p><strong>Hours:</strong> {service.additionalContent.officeHours}</p>
                </div>

                {/* Media Gallery */}
                <div className={styles.mediaGallery}>
                  {service.media.map((mediaUrl, index) => (
                    <img 
                      key={index}
                      src={mediaUrl}
                      alt={`${service.name} media ${index + 1}`}
                      className={styles.mediaImage}
                    />
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleDelete(service._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                  <button 
                    className={styles.editBtn}
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <UpdateServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onUpdate={handleUpdateComplete}
        />
      )}
    </div>
  );
};

export default ServiceManager; 