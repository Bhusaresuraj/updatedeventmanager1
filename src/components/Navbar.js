import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'services', 'testimonials'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    // Check if it's a page route (starts with '/')
    if (href.startsWith('/')) {
      router.push(href);
      return;
    }

    // Handle section scrolling
    if (router.pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleContact = () => {
    // WhatsApp click handler
    const phoneNumber = '919967825057'; // Add your WhatsApp number here
    const message = 'Hello, I would like to inquire about your services.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContent}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>Blizzard Production House</span>
            <span className={styles.logoSub}></span>
          </div>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.hamburgerLines}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <div className={styles.navLinksInner}>
            {[
              { href: '#hero', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '/why-blizz', label: 'Why Blizz' },
              { href: '#testimonials', label: 'Testimonials' },
              { href: '#location', label: 'Location' }
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`${styles.navLink} ${
                  !href.startsWith('/') && activeSection === href.slice(1) 
                    ? styles.active 
                    : ''
                }`}
              >
                <span className={styles.navLinkText}>{label}</span>
                <span className={styles.navLinkHighlight}></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 