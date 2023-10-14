import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import LogoutButton from '../Logout';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './stylenavbar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome, faNewspaper, faBook, faFeather, faBell, faBullhorn, faMailBulk, faQuestion, faDesktop} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';


const NavBar = () => {
  const [userInfo] = useAtom(userAtom);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const renderNavLinks = () => {
    const navLinks = [
      { to: '/', icon: faHome, label: 'Accueil' },
      { to: '/ouvrages', icon: faBook, label: 'Nos Ouvrages' },
      { to: '/auteurices', icon: faFeather, label: 'Nos auteurices' },
      { to: '/actus', icon: faNewspaper, label: 'Actualités' },
      { to: '/abonnement', icon: faBell, label: 'Nos abonnements' },
      { to: '/appel', icon: faBullhorn, label: 'Appel à Textes' },
      { to: '/contact', icon: faMailBulk, label: 'Contact' },
      { to: '/faq', icon: faQuestion, label: 'FAQ' },
      { to: '/admin', icon: faDesktop, label: 'Espace Admin' },
    ];

    return navLinks.map((link) => (
      <Nav.Link
        key={link.to}
        as={Link}
        to={link.to}
        className={`nav-button ${isExpanded ? 'expanded' : ''}`}
      >
        <FontAwesomeIcon icon={link.icon} className={`icon`} />
        {isExpanded && <span className="nav-label"> {link.label}</span>}
      </Nav.Link>
    ));
  };

  return (
    <Navbar expand="lg" className={` nav-side ${isExpanded ? 'nav-expanded' : 'nav-retracted'}`}>
      <Container>
        <Nav className={`me-auto ${isExpanded ? 'nav-expanded' : 'nav-retracted'}`}>
          <button onClick={handleToggle} className={`toggle-button ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faArrowRight} />}
          </button>
          {renderNavLinks()}
          {userInfo.isLoggedIn && <LogoutButton />}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
