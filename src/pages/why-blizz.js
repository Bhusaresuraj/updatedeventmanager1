import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/WhyBlizz.module.css';
import { FaTrophy, FaUsers, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const WhyBlizz = () => {
  const leadership = [
    {
      name: "Akash Sharma",
      role: "Founder & CEO",
      image: "/images/team/akash.jpg",
      description: "With over 5 years of experience in the entertainment industry, Akash has been the driving force behind Blizzard Production House's vision and growth.",
      instagram: "https://www.instagram.com/akash_sharma"
    },
    {
      name: "Sagar Sharma",
      role: "Co-Founder & Creative Director",
      image: "/images/team/sagar.jpg",
      description: "A creative visionary with extensive experience in event production and artist management.",
      instagram: "https://www.instagram.com/sagar_sharma"
    }
  ];

  const artists = [
    {
      name: "Rahul Kumar",
      specialty: "Dance Choreographer",
      image: "/images/artists/rahul.jpg",
      achievements: "Winner of Dance India Dance 2019",
      instagram: "https://www.instagram.com/rahul_kumar"
    },
    {
      name: "Priya Singh",
      specialty: "Vocalist",
      image: "/images/artists/priya.jpg",
      achievements: "Performed in over 100 live shows",
      instagram: "https://www.instagram.com/priya_singh"
    },
    // Add more artists as needed
  ];

  const handleInstagramClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Head>
        <title>Why Choose Blizz - Blizzard Production House</title>
        <meta name="description" content="Meet the team behind Blizzard Production House - leaders in event management and production services." />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>The Team Behind Blizzard</h1>
            <p>Passionate Professionals Creating Extraordinary Experiences</p>
          </div>
        </section>

        <section className={styles.leadership}>
          <div className={styles.container}>
            <h2>Our Leadership</h2>
            <div className={styles.leadershipGrid}>
              {leadership.map((leader, index) => (
                <div key={index} className={styles.leaderCard}>
                  <div className={styles.leaderImage}>
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={300}
                      height={300}
                      className={styles.profileImage}
                    />
                    <button 
                      className={styles.instagramButton}
                      onClick={() => handleInstagramClick(leader.instagram)}
                    >
                      <FaInstagram /> Follow on Instagram
                    </button>
                  </div>
                  <div className={styles.leaderInfo}>
                    <h3>{leader.name}</h3>
                    <h4>{leader.role}</h4>
                    <p>{leader.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.artists}>
          <div className={styles.container}>
            <h2>Our Featured Artists</h2>
            <div className={styles.artistsGrid}>
              {artists.map((artist, index) => (
                <div key={index} className={styles.artistCard}>
                  <div className={styles.artistImage}>
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      width={250}
                      height={250}
                      className={styles.profileImage}
                    />
                    <button 
                      className={styles.instagramButton}
                      onClick={() => handleInstagramClick(artist.instagram)}
                    >
                      <FaInstagram /> Follow
                    </button>
                  </div>
                  <div className={styles.artistInfo}>
                    <h3>{artist.name}</h3>
                    <h4>{artist.specialty}</h4>
                    <p>{artist.achievements}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <FaTrophy className={styles.statIcon} />
                <h3>500+</h3>
                <p>Events Managed</p>
              </div>
              <div className={styles.statCard}>
                <FaUsers className={styles.statIcon} />
                <h3>50+</h3>
                <p>Professional Artists</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WhyBlizz; 