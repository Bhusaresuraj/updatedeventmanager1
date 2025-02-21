import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const isServicePage = router.pathname.startsWith('/services');
  const isWhyBlizzPage = router.pathname === '/why-blizz';

  useEffect(() => {
    const handleScroll = () => {
      if (isWhyBlizzPage) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isWhyBlizzPage]);

  const handleNavClick = async (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // If href is a full page route (like /why-blizz), navigate directly
    if (!href.startsWith('#')) {
      await router.push(href);
      return;
    }

    // If we're not on the home page and trying to navigate to a section
    if (router.pathname !== '/') {
      await router.push('/');
      // Wait for navigation to complete
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
    <nav className={`
      ${styles.navbar} 
      ${isScrolled ? styles.scrolled : ''} 
      ${isServicePage ? styles.servicePage : ''}
      ${isWhyBlizzPage ? styles.solidBg : ''}
    `}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>Blizzard Production House</span>
            <span className={styles.logoSub}></span>
          </div>
        </Link>

        <button 
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
          <Link href="/" onClick={(e) => handleNavClick(e, '/')}>
            Home
          </Link>
          <Link href="/#about" onClick={(e) => handleNavClick(e, '#about')}>
            About
          </Link>
          <Link href="/why-blizz" onClick={(e) => handleNavClick(e, '/why-blizz')}>
            Why Blizz
          </Link>
          <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>
            Services
          </Link>
          <Link href="/#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>
            Testimonials
          </Link>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 