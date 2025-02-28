import { useState } from 'react';
import styles from './AdminComponents.module.css';
import { toast } from 'react-hot-toast';

const UpdateServiceModal = ({ service, onClose, onUpdate }) => {
  const [updatedService, setUpdatedService] = useState({
    shortDescription: service.shortDescription,
    description: service.description,
    formLink: service.formLink,
    whatsappLink: service.whatsappLink || [
      { title: '', url: '', description: '' },
      { title: '', url: '', description: '' }
    ],
    additionalContent: {
      contactEmail: service.additionalContent?.contactEmail || '',
      officeHours: service.additionalContent?.officeHours || ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Add basic fields
      formData.append('shortDescription', updatedService.shortDescription);
      formData.append('description', updatedService.description);
      formData.append('formLink', updatedService.formLink);

      // Add WhatsApp links
      updatedService.whatsappLink.forEach((link, index) => {
        formData.append(`whatsappLink[${index}][title]`, link.title);
        formData.append(`whatsappLink[${index}][url]`, link.url);
        formData.append(`whatsappLink[${index}][description]`, link.description);
      });

      // Add additional content
      formData.append('additionalContent', JSON.stringify(updatedService.additionalContent));

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections/${service._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      toast.success('Service updated successfully');
      onUpdate();
      onClose();
    } catch (err) {
      toast.error('Failed to update service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.serviceModal}>
        <h2>Update Service</h2>
        <form onSubmit={handleSubmit} className={styles.serviceUpdateForm}>
          <div className={styles.serviceFormGroup}>
            <label>Short Description:</label>
            <textarea
              value={updatedService.shortDescription}
              onChange={(e) => setUpdatedService({
                ...updatedService,
                shortDescription: e.target.value
              })}
              required
            />
          </div>

          <div className={styles.serviceFormGroup}>
            <label>Full Description:</label>
            <textarea
              value={updatedService.description}
              onChange={(e) => setUpdatedService({
                ...updatedService,
                description: e.target.value
              })}
              required
            />
          </div>

          <div className={styles.serviceFormGroup}>
            <label>Form Link:</label>
            <input
              type="url"
              value={updatedService.formLink}
              onChange={(e) => setUpdatedService({
                ...updatedService,
                formLink: e.target.value
              })}
              required
            />
          </div>

          {/* WhatsApp Links */}
          {updatedService.whatsappLink.map((link, index) => (
            <div key={index} className={styles.whatsappLinkGroup}>
              <h3>WhatsApp Link {index + 1}</h3>
              <input
                type="text"
                placeholder="Title"
                value={link.title}
                onChange={(e) => {
                  const updatedLinks = [...updatedService.whatsappLink];
                  updatedLinks[index].title = e.target.value;
                  setUpdatedService({...updatedService, whatsappLink: updatedLinks});
                }}
                required
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => {
                  const updatedLinks = [...updatedService.whatsappLink];
                  updatedLinks[index].url = e.target.value;
                  setUpdatedService({...updatedService, whatsappLink: updatedLinks});
                }}
                required
              />
              <textarea
                placeholder="Description"
                value={link.description}
                onChange={(e) => {
                  const updatedLinks = [...updatedService.whatsappLink];
                  updatedLinks[index].description = e.target.value;
                  setUpdatedService({...updatedService, whatsappLink: updatedLinks});
                }}
                required
              />
            </div>
          ))}

          {/* Additional Content */}
          <div className={styles.additionalContentSection}>
            <h3>Additional Content</h3>
            <input
              type="email"
              placeholder="Contact Email"
              value={updatedService.additionalContent.contactEmail}
              onChange={(e) => setUpdatedService({
                ...updatedService,
                additionalContent: {
                  ...updatedService.additionalContent,
                  contactEmail: e.target.value
                }
              })}
              required
            />
            <input
              type="text"
              placeholder="Office Hours"
              value={updatedService.additionalContent.officeHours}
              onChange={(e) => setUpdatedService({
                ...updatedService,
                additionalContent: {
                  ...updatedService.additionalContent,
                  officeHours: e.target.value
                }
              })}
              required
            />
          </div>

          <div className={styles.serviceModalActions}>
            <button 
              type="button" 
              onClick={onClose}
              className={styles.serviceCancelBtn}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.serviceSubmitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal; 