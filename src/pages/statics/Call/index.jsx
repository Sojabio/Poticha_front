import './style.css'
import chatpascontent from '../../../assets/chatpascontent.png'
import chatvollant from '../../../assets/chatvollant.png'

const Call = () => {
  return (
    <div className="call">
      <div className="call-title-container">
        <h3>APPEL À TEXTES</h3>
      </div>
      <div  className='call-content'>
        <div className='left-column'>
          <img src={chatvollant} alt="chat qui vole avec des ballons livres" className='flyingcat'></img>
        </div>
        <div className="right-column">
          <img src={chatpascontent} alt="chat noir pas content" className='angrycat'></img>
          <div className='call-text'>
            <p>Nous voulons des oeuvres puissantes et non-oppressives qui vont construire le monde libéré en déployant d’autres imaginaires et des langues inventives. </p>
            <p>Notre catalogue contiendra un minimum de 50% de personne s’identifiant comme femmes et 25% de personnes non-binaires cis. Il y aura également un minimum de 35% de personnes racisées. </p>
            <p>Notre maison se veut également le moins précarisante possible pour celleux qui créent la valeur des livres. Aussi nous reversons 50% de la valeur ajoutées des ventes aux auteurices.</p>
            <p>Tous nos livres sont faits main et disponibles dans nos abonnements mensuels.</p>
            <p>Nous sommes actuellement à la recherche de pièces brèves (autour de 3100 mots).</p>
            <p>Pour plus d’informations ou pour nous les envoyer par mail :</p>
            <a className="call-button" href="mailto:lep@mail.com">lepoticha@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Call
