import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import LogoutButton from '../Logout';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './stylenavbar.css'

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown" className='dropdown-b'>
            <NavDropdown.Item as={Link} to="/">Accueil</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/abonnement">L'abonnement</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/appel">
                L'appel à textes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/actus">Notre actualité</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ouvrages">Les ouvrages</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/auteurices">Les auteurices</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faq">F.A.Q</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">Nous contacter</NavDropdown.Item>
              <NavDropdown.Divider />
              {userInfo.isLoggedIn ? (
                <>
                  <NavDropdown.Item as={Link} to="/admin">Espace admin</NavDropdown.Item>
                  <NavDropdown.Item><LogoutButton /></NavDropdown.Item>
                </>
              ) : (
              <NavDropdown.Item as={Link} to="/login">
                Espace admin
              </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar
