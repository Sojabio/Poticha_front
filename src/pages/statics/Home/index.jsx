import React from 'react';
import './homepagestyle.css';
import { Carousel } from 'react-bootstrap';
import Countdown from '../../../components/Countdown/Countdown';
import Chatvollant from '../../../assets/chatvollant.png';
import Chatpascontent from '../../../assets/chatpascontent.png';


const HomePage = () => {
  return (
    <div className="homepage">
      <div className="top">
        <div className='countdown'>
          <Countdown />
        </div>
        <img src={Chatpascontent} alt="Chat noir pas content" className='hungry-cat'/>
        <h1 className="main-title">Le Pôticha</h1>
        <h3 className='main-subtitle'> Le théatre dans votre boite aux lettres</h3>
      </div>
      <div className="carousel">
        <Carousel className='carousel-part'>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src='/src/assets/images/fondpoticha.png'
              alt="Première image"
            />
            <h3 className='cta-carousel'>Envie d'écrire ?</h3>
            <button className='button-carousel'>Notre appel à textes</button>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src='/src/assets/images/fondpoticha.png'
              alt="Deuxième image"
            />
            <h3 className='cta-carousel' id='lire-cta'>Envie de lire ?</h3>
            <button className='button-carousel' id='lire-btn'>Nos abonnements</button>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src='/src/assets/images/fondpoticha.png'
              alt="Deuxième image"
            />
            <h3 className='cta-carousel'id='rien-cta'>Envie de rien ?</h3>
            <button className='button-carousel' id='rien-btn'>Appelle THP</button>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;



