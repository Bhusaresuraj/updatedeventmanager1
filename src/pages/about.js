import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OptimizedImage from '../components/OptimizedImage';
import styles from '../styles/About.module.css';


const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "Founder & CEO",
      image: "https://via.placeholder.com/300" // Temporary placeholder
    },
    {
      name: "Jane Smith",
      position: "Creative Director",
      image: "https://via.placeholder.com/300" // Temporary placeholder
    },
    {
      name: "Mike Johnson",
      position: "Event Manager",
      image: "https://via.placeholder.com/300" // Temporary placeholder
    },
    {
      name: "Sarah Williams",
      position: "Marketing Head",
      image: "https://via.placeholder.com/300" // Temporary placeholder
    }
  ];

  return (
    <>
      <Navbar />
      <main className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.aboutHero}>
          <div className={styles.heroContent}>
            <h1>Our Story</h1>
            <p>Creating Extraordinary Events Since 2010</p>
          </div>
        </section>

        {/* Company Overview */}
        <section className={styles.overview}>
          <div className={styles.container}>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewImage}>
                <OptimizedImage
                  src="https://via.placeholder.com/800x600"
                  alt="Blizard Production House Overview"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.overviewContent}>
                <h2>Who We Are</h2>
                <p>Blizard Production House is a premier event management company specializing in creating unforgettable experiences. With over a decade of expertise, we've established ourselves as industry leaders in event planning and execution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.team}>
          <div className={styles.container}>
            <h2>Meet Our Team</h2>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div key={index} className={styles.teamMember}>
                  <div className={styles.memberImage}>
                    <OptimizedImage
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className={styles.image}
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className={styles.vision}>
          <div className={styles.container}>
            <div className={styles.visionGrid}>
              <div className={styles.visionContent}>
                <h2>Our Vision</h2>
                <p>To be the leading force in transforming events into extraordinary experiences, setting new standards in creativity and execution.</p>
              </div>
              <div className={styles.visionImage}>
                <OptimizedImage
                  src="https://via.placeholder.com/800x600"
                  alt="Our Vision"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About; 