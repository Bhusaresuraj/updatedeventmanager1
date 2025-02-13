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
import { services } from '../data/services';
import Location from '../components/Location';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import ThankYouMessage from '../components/ThankYouMessage';

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

  useEffect(() => {
    // Check if we're returning from another page
    const isReturningVisitor = sessionStorage.getItem('hasVisited');
    
    if (isReturningVisitor) {
      // Skip loading screen for returning visitors
      setIsLoading(false);
    } else {
      // Show loading screen only for first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Set the flag in sessionStorage
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);
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
                <img 
                  src="/images/about.jpg" 
                  alt="About Blizard Production House"
                  className={styles.imageStyle}
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
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <Link 
                  href={`/services/${service.id}`} 
                  key={service.id} 
                  className={styles.serviceBlog}
                >
                  <div className={styles.serviceImage}>
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className={styles.serviceContent}>
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                    <ul>
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <EnquiryButton />
                  </div>
                </Link>
              ))}
            </div>
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