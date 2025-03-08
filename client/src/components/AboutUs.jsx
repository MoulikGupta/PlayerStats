
import React from 'react';
import { Github, Linkedin, Mail, TowerControl as GameController, BarChart2, Users } from 'lucide-react';
import '../css/aboutus.css';

  const AboutUs = () => {
    const founders = [
      {
        id: 1,
        name: "Moulik Gupta",
        role: "Lead Developer & Co-Founder",
        bio: "Gaming enthusiast with over 8 years of experience in full-stack development. Passionate about creating tools that help gamers track and improve their performance.",
        image: "https://www.pngarts.com/files/10/Doom-Slayer-Helmet-Download-PNG-Image.png",
        social: {
          github: "https://github.com/MoulikGupta",
          linkedin: "https://www.linkedin.com/in/moulikgupta18/",
          email: "moulikgupta8@gmail.com"
        }
      },
      {
        id: 2,
        name: "Moulik Gupta",
        role: "UX Designer & Co-Founder",
        bio: "Professional gamer turned UX designer with a keen eye for creating intuitive interfaces. Dedicated to making PlayerStatsViewer the go-to platform for gamers worldwide.",
        image: "https://i.etsystatic.com/49308495/c/1024/1024/0/0/il/d22853/6129622863/il_300x300.6129622863_6wvi.jpg",
        social: {
          github: "https://github.com/MoulikGupta",
          linkedin: "https://www.linkedin.com/in/moulikgupta18/",
          email: "moulikgupta8@gmail.com"
        }
      }
    ];
  
    const features = [
      {
        icon: <GameController size={24} />,
        title: "Multi-Game Support",
        description: "Track your stats across multiple popular games from a single dashboard"
      },
      {
        icon: <BarChart2 size={24} />,
        title: "Advanced Analytics",
        description: "Dive deep into your gameplay with detailed performance metrics and trends"
      },
      {
        icon: <Users size={24} />,
        title: "Community Leaderboards",
        description: "Compare your stats with friends and the global gaming community"
      }
    ];
  
    return (
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>About <span className="highlight">PlayerStatsViewer</span></h1>
          <div className="header-underline"></div>
          <p className="mission-statement">
            Our mission is to provide gamers with detailed insights into their in-game performance, 
            helping them track progress and improve their skills through comprehensive analytics.
          </p>
        </div>
  
        <div className="about-us-content">
          <section className="our-story">
            <h2>Our Story</h2>
            <p>
              PlayerStatsViewer was born from a simple idea: gamers deserve better tools to understand their performance. 
              Founded in 2025, we are dedicated in creating a platform that transforms complex game data into 
              actionable insights, helping players of all skill levels improve their gameplay.
            </p>
            <p>
              What started as a passion project between two gaming enthusiasts has grown into a comprehensive 
              stats platform supporting multiple games and thousands of players worldwide.
            </p>
          </section>
  
          <section className="features-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
  
          <section className="founders-section">
            <h2>Meet Our Founders</h2>
            <div className="founders-cards">
              {founders.map(founder => (
                <div className="founder-card" key={founder.id}>
                  <div className="founder-image">
                    <img src={founder.image} alt={founder.name} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="founder-info">
                    <h3>{founder.name}</h3>
                    <p className="founder-role">{founder.role}</p>
                    <p className="founder-bio">{founder.bio}</p>
                    <div className="founder-social">
                      <a href={founder.social.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <Github size={20} />
                      </a>
                      <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <Linkedin size={20} />
                      </a>
                      <a href={`mailto:${founder.social.email}`} className="social-icon">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default AboutUs;