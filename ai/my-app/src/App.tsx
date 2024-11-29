import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Dashboard'; // Import Dashboard Component

function App() {
  const [showDashboard, setShowDashboard] = useState(false); // State to control whether to show Dashboard

  const handleGetStartedClick = () => {
    setShowDashboard(true); // Show Dashboard when the button is clicked
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    let currentIndex = 0; // Initialize the starting index

    const setActiveSection = (index: number) => {
      sections.forEach((section) => {
        section.classList.remove('active');
      });
      if (sections[index]) {
        sections[index].classList.add('active');
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
      }

      if (sections[currentIndex]) {
        sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
        setActiveSection(currentIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    setActiveSection(currentIndex);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="App">
      {!showDashboard ? (
        <header className="App-header">
          <div className="landing-container">
            <section id="section1" className="section active">
              <h1 className="hero-title">Take Your Coding Career to the Next Level</h1>
              <p className="hero-subtitle">
                Build your skills, gain real-world experience, and land your dream internship.
              </p>
              <div className="cta">
                <button
                  className="cta-button"
                  onClick={handleGetStartedClick} // Button click triggers state change to show Dashboard
                >
                  Get Started with Your Journey
                </button>
              </div>
            </section>

            <section id="section2" className="section">
              <h2>How We Help You Succeed</h2>
              <div className="info-cards">
                <div className="info-card">
                  <h3>Skill Development</h3>
                  <p>Enhance your coding skills with hands-on projects and tutorials.</p>
                </div>
                <div className="info-card">
                  <h3>Real-World Experience</h3>
                  <p>Work on live coding challenges to build a portfolio employers will love.</p>
                </div>
                <div className="info-card">
                  <h3>Networking</h3>
                  <p>Connect with industry professionals and access exclusive internship opportunities.</p>
                </div>
              </div>
            </section>
          </div>
        </header>
      ) : (
        <Dashboard /> // Show the Dashboard component when state is true
      )}
    </div>
  );
}

export default App;
