import React from 'react';
import { Link } from 'react-router-dom';
import './homepagestyle.css';
import Carousel from 'react-bootstrap/Carousel';
import Countdown from '../../../components/Countdown/Countdown';
import Chatvollant from '../../../assets/chatvollant.png';
import Chatpascontent from '../../../assets/chatpascontent.png';
import Fondpoticha from '../../../assets/fondpoticha.png'

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="top">
        <div className='countdown'>
          <Countdown />
        </div>
        <h1 className="main-title">Le Pôticha</h1>
        <h3 className='main-subtitle'> Le théâtre dans votre boîte aux lettres</h3>
        <img src={Chatpascontent} alt="Chat noir pas content" className='hungry-cat'/>
        <img src={Chatvollant} alt="Chat vollant avec des livres ballons" className='flying-cat'/>
      </div>
      <div className="carousel">
        <Carousel className='carousel-part'>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src={Fondpoticha}
              alt="Première image"
            />
            <h3 className='cta-carousel' id='lire-cta'>Envie de lire ?</h3>
            <Link to="/abonnement">
              <button className='button-carousel' id='lire-btn'>Nos abonnements</button>
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src={Fondpoticha}
              alt="Deuxième image"
              />
            <h3 className='cta-carousel' id='ecrire-cta'>Envie d'écrire ?</h3>
            <Link to="/appel">
              <button className='button-carousel' id='lire-btn'>Notre appel à textes</button>
            </Link>
          </Carousel.Item>
          <Carousel.Item>
           <img
              className="d-block w-100 carousel-img"
              src={Fondpoticha}
              alt="Troisième image"
            />
            <h3 className='cta-carousel'id='rien-cta'>Envie de nous rencontrer ?</h3>
            <Link to="/actus">
              <button className='button-carousel' id='rien-btn'>Notre actualité</button>
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
