
import Showdown from 'showdown';
const converter = new Showdown.Converter();

const DisplayContent = ({ content }) => {
  const contentHTML = converter.makeHtml(content);

  return (
    <div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
      </div>
    </div>
  )

}

export default DisplayContent;
