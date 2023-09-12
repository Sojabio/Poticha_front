import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAtom } from 'jotai';
import { userAtom } from './stores/userAtom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar'


//static pages
import Home from './pages/statics/Home'
import Abo from './pages/statics/Abo';
import Call from './pages/statics/Call';
import Faq from './pages/statics/Faq';
import Contact from './pages/statics/Contact';


//dynamic pages
import Books from './pages/dynamics/Books';
import Book from './pages/dynamics/Book';
import Authors from './pages/dynamics/Authors';
import Author from './pages/dynamics/Author';
import Infos from './pages/dynamics/Infos';
import Info from './pages/dynamics/Info';

//admin
import Login from './pages/Admin/Auth/Login';
import Dashboard from './pages/Admin/Dashboard';
import LogoutSuccess from './pages/Admin/Auth/LogoutSuccess';

function App() {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token) {
      setUser({
        id: id,
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);


  return (
    <div className='globale'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/abonnement" element={<Abo/>} />
          <Route path="/appel" element={<Call/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/ouvrages" element={<Books/>} />
          <Route path="/ouvrages/:id" element={<Book/>} />
          <Route path="/actus" element={<Infos/>} />
          <Route path="/actus/:id" element={<Info/>} />
          <Route path="/auteurices" element={<Authors/>} />
          <Route path="/auteurices/:id" element={<Author/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<Dashboard/>} />
          <Route path="/logoutsuccess" element={<LogoutSuccess/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
