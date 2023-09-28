import facebookIcon from '../../assets/icons/facebook.svg'; 
import instagramIcon from '../../assets/icons/instagram.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import './stylesocialbar.css';

const Socialbar = () => {
  return (
    <nav className="social-bar">
      <ul className="social-icons">
        <li className="social-icon">
          <a href="https://www.facebook.com/lepotichaeditions?locale=fr_FR" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook Icon" />
          </a>
        </li>
        <li className="social-icon">
          <a href="https://www.youtube.com/channel/UCumKXFIsFSyrcN2ut-vfAWQ" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="Youtube Icon" />
          </a>
        </li>
        <li className="social-icon">
          <a href="https://www.instagram.com/lepoticha.editions/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram Icon" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Socialbar;
