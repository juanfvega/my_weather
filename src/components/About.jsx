import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <div className="about-header">
                    <h1 className="about-title">About Us</h1>
                    <div className="about-subtitle">
                        <span className="weather-icon">🌤️</span>
                        Your trusted weather companion
                    </div>
                </div>
                
                <div className="about-description">
                    <p className="about-intro">
                        Welcome to our Weather App! We are dedicated to providing you with 
                        accurate and up-to-date weather information for locations around the world.
                    </p>
                    
                    <p className="about-mission">
                        Our mission is to deliver reliable weather forecasts that help you plan 
                        your day, week, and travels with confidence.
                    </p>
                </div>
                
                <div className="features-section">
                    <h2 className="features-title">Features</h2>
                    <ul className="features-list">
                        <li className="feature-item">
                            <span className="feature-icon">⚡</span>
                            <span className="feature-text">Real-time weather updates</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-icon">📅</span>
                            <span className="feature-text">15-day weather forecast</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-icon">🌍</span>
                            <span className="feature-text">Multiple location support</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-icon">📊</span>
                            <span className="feature-text">Detailed weather metrics</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-icon">📱</span>
                            <span className="feature-text">Responsive design</span>
                        </li>
                    </ul>
                </div>
                
                <div className="about-footer">
                    <div className="tech-stack">
                        <h3 className="tech-title">Built with</h3>
                        <div className="tech-badges">
                            <span className="tech-badge">React</span>
                            <span className="tech-badge">Material-UI</span>
                            <span className="tech-badge">Visual Crossing API</span>
                            <span className="tech-badge">Vite</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;