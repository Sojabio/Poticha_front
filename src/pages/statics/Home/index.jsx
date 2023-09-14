import React from 'react'
import './style.css'
import chatvollant from '../../../assets/chatvollant.png'
import chatpascontent from '../../../assets/chatpascontent.png'
import Countdown from '../../../components/Countdown/Countdown'

const Home = () => {
  return (
    <div className='homepage'>
      <section className='banner'>
        <div className='titles'>
          <h1 className='main-title'> Le Pôticha</h1>
          <h3 className='main-subtitle'> La maison d'édition de théâtre libre </h3>
        </div>
        <div className='CTA'>
            <Countdown />
        </div>
      </section>
      <section className='middle-stripe'>
        <h3>Du théatre engagé</h3>
        <h3>tous les mois</h3>
        <h3>dans ta boîte aux lettres</h3>
      </section>
      <section className='bottom-stripe'>
        <img src={chatvollant} alt="chat vollant avec des ballons livre" className='chatvollant'></img>
        <div className='sub_link'>
          <h3> Envie de lire ?</h3>
          <button href='#'>Nos abonnements</button>
        </div>
        <div className='texts_link'>
          <h3> Envie d'écrire ?</h3>
          <button href='#'>Notre appel à textes</button>
        </div>
        <div className='suggests_link'>
          <h3> Envie de rien ?</h3>
          <button href='#'>Nos suggestions</button>
        </div>
      </section>
    </div>
  )
}

export default Home
