import CreatePost from '../../../components/Admin/Infos/create';
import CreateAuthor from '../../../components/Admin/Authors/create';
import CreateBook from '../../../components/Admin/Books/create';
import UpdateCountdown from '../../../components/Admin/Countdown/UpdateCountdown';
import './styledashboard.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Tabs
      defaultActiveKey="post"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab
        eventKey="post"
        title="Info"
        tabClassName="custom-tab"
      >
        <CreatePost />
      </Tab>
      <Tab
        eventKey="author"
        title="Auteurice"
        tabClassName="custom-tab"
      >
        <CreateAuthor />
      </Tab>
      <Tab
        eventKey="book"
        title="Ouvrage"
        tabClassName="custom-tab"
      >
        <CreateBook />
      </Tab>
      <Tab
        eventKey="countdown"
        title="Décompte"
        tabClassName="custom-tab"
      >
        <UpdateCountdown />
      </Tab>
    </Tabs>
  </div>

  );
}

export default Dashboard;
