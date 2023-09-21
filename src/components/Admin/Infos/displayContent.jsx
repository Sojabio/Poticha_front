import './style.css'
import Showdown from 'showdown';
const converter = new Showdown.Converter();

const DisplayContent = ({ content }) => {
  const contentHTML = converter.makeHtml(content);

  return (
    <div className="display-content">
      <div  dangerouslySetInnerHTML={{ __html: contentHTML }} />
    </div>
  )
}

export default DisplayContent;
