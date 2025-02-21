import React from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.logo}>Blizzard Production House</h3>
          <p>Creating extraordinary experiences since 2018</p>
          <div className={styles.socialLinks}>
            <a href="https://wa.me/919967825057" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
            <a href="https://www.instagram.com/blizzard_production_house" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com/blizard" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/company/blizzard-production-house/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href="/#hero" onClick={(e) => handleNavClick(e, '#hero')}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" onClick={(e) => handleNavClick(e, '#about')}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/#location" onClick={(e) => handleNavClick(e, '#location')}>
                Location
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Services</h4>
          <ul>
            <li>Artist Management</li>
            <li>Human Resource</li>
            <li>Marketing</li>
            <li>Akash Acting Academy</li>
            <li>Akash Sports Academy</li>
            <li>AkashVaani</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <address className={styles.addressBlock}>
            <p>
              <strong>Blizzard Production House</strong><br />
              <br />
              Mumbai, Maharashtra<br />
              India
            </p>
            <p>
              <FaEnvelope className={styles.contactIcon} />
              <a href="mailto:info@blizardproductions.com">blizzardproductionhouse@gmail.com</a>
            </p>
            <p>
              <FaWhatsapp className={styles.contactIcon} />
              <a href="tel:+919967825057">+91 9967825057</a>
            </p>
          </address>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Blizard Production House. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <a 
            href="/admin/login"
            className={styles.adminLink}
          >
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 