import CreatePost from '../../../components/Admin/Infos/create';
import CreateAuthor from '../../../components/Admin/Authors/create';
import CreateBook from '../../../components/Admin/Books/create';
import UpdateCountdown from '../../../components/Admin/Countdown/UpdateCountdown';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Dashboard() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="post" title="Info">
        Ajouter une information
        <CreatePost />
      </Tab>
      <Tab eventKey="author" title="Auteurice">
        Ajouter un-e auteurice
        <CreateAuthor />
      </Tab>
      <Tab eventKey="book" title="Ouvrage">
        Ajouter un ouvrage
        <CreateBook />
      </Tab>
      <Tab eventKey="countdown" title="Décompte">
        Paramétrer le décompte
        <UpdateCountdown/>
      </Tab>
    </Tabs>
  );
}

export default Dashboard;
