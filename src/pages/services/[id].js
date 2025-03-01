import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EnquiryButton from '../../components/EnquiryButton';
import styles from '../../styles/services/Service.module.css';

export async function getServerSideProps({ params }) {
  try {
    console.log('Fetching service details for ID:', params.id);
    const detailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections/${params.id}`);
    const detailData = await detailResponse.json();
    
    if (!detailData.success) {
      console.log('Service fetch unsuccessful');
      return { notFound: true };
    }

    return {
      props: { 
        service: detailData.data,
        isSpecialService: detailData.data.name === 'Events' || detailData.data.name === 'ArtistManagement'
      }
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return { notFound: true };
  }
}

const ServiceDetail = ({ service, isSpecialService }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.serviceContainer}>
      <Navbar />
      
      <main className={styles.serviceContent}>
        <div className={styles.heroSection}>
          <img src={service.bannerImage} alt={service.name} />
          <div className={styles.heroContent}>
            <h1>{service.name}</h1>
            <p>{service.shortDescription}</p>
          </div>
        </div>

        <div className={styles.contentWrapper}>


          {/* WhatsApp Groups Section */}
          {service.whatsappLink && service.whatsappLink.length > 0 && (
            <section className={styles.whatsappGroups}>
              <h2>Join Our Communities</h2>
              <div className={styles.groupsGrid}>
                {service.whatsappLink.map((group, index) => (
                  <div key={index} className={styles.whatsappGroup}>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <a href={group.url} target="_blank" rel="noopener noreferrer" 
                       className={styles.whatsappLink}>
                      Join Group
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Media Gallery */}
          {service.media && service.media.length > 0 && (
            <section className={styles.mediaGallery}>
              <h2>Gallery</h2>
              <div className={styles.mediaGrid}>
                {service.media.map((url, index) => (
                  <img key={index} src={url} alt={`${service.name} gallery ${index + 1}`} />
                ))}
              </div>
            </section>
          )}

          {/* Additional Content */}
          <section className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <p>Email: {service.additionalContent.contactEmail}</p>
            <p>Office Hours: {service.additionalContent.officeHours}</p>
          </section>

          {/* Special Service Links */}
          {isSpecialService && (
            <section className={styles.specialLinks}>
              {service.name === 'Events' && (
                <Link href="/events" className={styles.specialLink}>
                  View All Events
                </Link>
              )}
              {service.name === 'ArtistManagement' && (
                <Link href="/artists" className={styles.specialLink}>
                  View Our Artists
                </Link>
              )}
            </section>
          )}

          <section className={styles.cta}>
            {service.formLink && (
              <a href={service.formLink} target="_blank" rel="noopener noreferrer" 
                 className={styles.formLink}>
                Register Now
              </a>
            )}
            <EnquiryButton />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;