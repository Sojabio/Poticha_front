import CreatePost from '../Infos/create';

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
        Aujouter un-e auteurice
      </Tab>
      <Tab eventKey="book" title="Ouvrage">
        Ajouter un ouvrage
      </Tab>
    </Tabs>
  );
}

export default Dashboard;
