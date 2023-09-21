import React, { useState } from 'react';
import facebookIcon from '../../assets/icons/facebook.svg'; // Importez l'image Facebook
import instagramIcon from '../../assets/icons/instagram.svg'; 
import youtubeIcon from '../../assets/icons/youtube.svg'; 
import './stylesocialbar.css';

const Socialbar = () => {
  return (
    <nav className="social-bar">
      <ul className="social-icons">
        <li className="social-icon">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook Icon" />
          </a>
        </li>
        <li className="social-icon">
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="Facebook Icon" />
          </a>
        </li>
        <li className="social-icon">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram Icon" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Socialbar;
