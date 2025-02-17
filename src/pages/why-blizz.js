import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/WhyBlizz.module.css';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const WhyBlizz = () => {
  const teamMembers = [
    {
      name: "Akash Gupta",
      role: "Founder & CEO",
      image: "/images/team/vishal.png",
      description: "Visionary leader with extensive experience in event management and production.",
      social: {
        linkedin: "https://linkedin.com/in/akash",
        instagram: "https://instagram.com/akash"
      }
    },
    {
      name: "Co-Founder Name",
      role: "Co-Founder & Creative Director",
      image: "/images/team/cofounder.jpg",
      description: "Creative genius behind our most innovative event concepts.",
      social: {
        linkedin: "https://linkedin.com/in/cofounder",
        instagram: "https://instagram.com/cofounder"
      }
    },
    // Add more team members here
  ];

  const artists = [
    {
      name: "Artist Name",
      specialty: "Dance Choreographer",
      image: "/images/team/artist1.jpg",
      description: "Expert in contemporary and classical dance forms.",
      social: {
        instagram: "https://instagram.com/artist1"
      }
    },
    // Add more artists here
  ];

  return (
    <>
      <Navbar />
      <main className={styles.whyBlizzPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Why Choose Blizzard Production House</h1>
            <p>Meet the creative minds behind extraordinary events</p>
          </div>
        </section>

        <section className={styles.teamSection}>
          <div className="container">
            <h2>Our Leadership at Blizzard Production House</h2>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div key={index} className={styles.teamCard}>
                  <div className={styles.memberImage}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className={styles.memberInfo}>
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{member.description}</p>
                    <div className={styles.socialLinks}>
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                          <FaInstagram />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.artistSection}>
          <div className="container">
            <h2>Our Artists</h2>
            <div className={styles.artistGrid}>
              {artists.map((artist, index) => (
                <div key={index} className={styles.artistCard}>
                  <div className={styles.artistImage}>
                    <img src={artist.image} alt={artist.name} />
                  </div>
                  <div className={styles.artistInfo}>
                    <h3>{artist.name}</h3>
                    <h4>{artist.specialty}</h4>
                    <p>{artist.description}</p>
                    <div className={styles.socialLinks}>
                      {artist.social.instagram && (
                        <a href={artist.social.instagram} target="_blank" rel="noopener noreferrer">
                          <FaInstagram />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WhyBlizz; 