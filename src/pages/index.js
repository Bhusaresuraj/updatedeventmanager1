import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import FeedbackForm from '../components/FeedbackForm';
import EnquiryButton from '../components/EnquiryButton';
import PaymentButton from '../components/PaymentButton';
import { EventContext } from '../context/EventContext';
import styles from '../styles/Home.module.css';
import ChatBot from '../components/ChatBot';
import Link from 'next/link';
import Location from '../components/Location';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import ThankYouMessage from '../components/ThankYouMessage';
import Image from 'next/image';

const HeroLinks = () => {
  const socialLinks = [
    {
      name: "Youtube",
      href: "https://youtube.com/@blizzard_events?si=ZDLU_OmxMvnQdGs_",
      icon: <FaYoutube />
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/blizzard_production_house",
      icon: <FaInstagram />
    },
    {
      name: "Facebook",
      href: "https://facebook.com/blizard",
      icon: <FaFacebook />
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/blizzard-production-house/",
      icon: <FaLinkedin />
    }
  ];

  return (
    <div className={styles.socialLinks}>
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.socialIcon}>{link.icon}</span>
          <span className={styles.socialText}>{link.name}</span>
        </Link>
      ))}
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { events } = React.useContext(EventContext);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  useEffect(() => {
    // Check if we're returning from another page
    const isReturningVisitor = sessionStorage.getItem('hasVisited');
    
    if (isReturningVisitor) {
      // Skip loading screen for returning visitors
      setIsLoading(false);
    } else {
      // Show loading screen for 8 seconds on first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Set the flag in sessionStorage
        sessionStorage.setItem('hasVisited', 'true');
      }, 8000); // Changed to 8000 milliseconds (8 seconds)
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const serviceBlogs = document.querySelectorAll(`.${styles.serviceBlog}`);
    serviceBlogs.forEach((blog) => observer.observe(blog));

    return () => {
      serviceBlogs.forEach((blog) => observer.unobserve(blog));
    };
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections`);
        const data = await response.json();
        
        if (data.success) {
          setServices(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setServicesError(err.message);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <ThankYouMessage />
      <main>
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/HuKzt1aEdhM?autoplay=1&mute=1&loop=1&playlist=HuKzt1aEdhM"
              title="Blizzard Production House"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoFrame}
            ></iframe>
          </div>
          <div className={styles.heroContent}>
            <h1>
              <div className={styles.titleLine}>
                {"From organizing events to managing your brand marketing".split('').map((char, index) => (
                  <span key={index}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </h1>
            <p>
              {" Team Blizzard is here for you.".split('').map((char, index) => (
                <span key={index}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
            <HeroLinks />
            <EnquiryButton />
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className={`section ${styles.about}`}>
          <div className="container">
            <h2 className="section-title">About Us</h2>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutContent}>
                <h3>Welcome to Blizard Production House</h3>
                <p>We are a premier event management company dedicated to creating extraordinary experiences. Our team of creative professionals brings your vision to life with meticulous attention to detail and innovative solutions.</p>
                <div className={styles.aboutFeatures}>
                  <div className={styles.feature}>
                    <h4>Experience</h4>
                    <p>Over 5 years of excellence in event management</p>
                  </div>
                  <div className={styles.feature}>
                    <h4>Expertise</h4>
                    <p>Specialized in corporate events, weddings, and celebrations</p>
                  </div>
                  <div className={styles.feature}>
                    <h4>Quality</h4>
                    <p>Committed to delivering exceptional service</p>
                  </div>
                </div>
              </div>
              <div className={styles.aboutImage}>
                <Image 
                  src="/images/about.jpg"
                  alt="About Blizard Production House"
                  width={600}
                  height={400}
                  objectFit="cover"
                  className={styles.imageStyle}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section id="upcoming-events" className={`section ${styles.upcomingEvents}`}>
          <div className="container">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="grid grid-3">
              {events.upcoming.map(event => (
                <EventCard key={event.id} event={event}>
                  <PaymentButton eventId={event.id} />
                </EventCard>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`section ${styles.services}`}>
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            {servicesLoading ? (
              <div>Loading services...</div>
            ) : servicesError ? (
              <div>Error loading services: {servicesError}</div>
            ) : (
              <div className={styles.servicesGrid}>
                {services.map((service) => (
                  <Link 
                    href={`/services/${service._id}`} 
                    key={service._id} 
                    className={styles.serviceBlog}
                  >
                    <div className={styles.serviceImage}>
                      <img src={service.bannerImage} alt={service.name} />
                    </div>
                    <div className={styles.serviceContent}>
                      <h3>{service.name}</h3>
                      <p>{service.shortDescription}</p>
                      <EnquiryButton />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={`section ${styles.testimonials}`}>
          <div className="container">
            <h2 className="section-title">Client Testimonials</h2>
            <div className={styles.testimonialGrid}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p>"Exceptional service and attention to detail. Our wedding was perfect!"</p>
                  <h4>- Sarah & John</h4>
                </div>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p>"The team went above and beyond for our corporate event."</p>
                  <h4>- Tech Corp CEO</h4>
                </div>
              </div>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p>"Professional, creative, and highly recommended!"</p>
                  <h4>- Birthday Celebration Client</h4>
                </div>
              </div>
            </div>
            <FeedbackForm />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`section ${styles.contact}`}>
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className={styles.contactContent}>
              <EnquiryButton />
            </div>
          </div>
        </section>

        <Location />

        <ChatBot />
      </main>
      <Footer />
    </>
  );
};

export default Home; 