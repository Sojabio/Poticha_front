import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAuthors, fetchBooks } from "./stores/apiFetch";

import { useAtom } from 'jotai';
import { userAtom } from './stores/userAtom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar'
import Socialbar from './components/Socialbar';


//static pages
import Home from './pages/statics/Home'
import Abo from './pages/statics/Abo';
import Call from './pages/statics/Call';
import Faq from './pages/statics/Faq';
import Contact from './pages/statics/Contact';
import MailSuccess from './pages/statics/Contact/success';


//dynamic pages
import Books from './pages/dynamics/Books';
import Book from './pages/dynamics/Book';
import Authors from './pages/dynamics/Authors';
import Author from './pages/dynamics/Author';
import ContactAuthor from './pages/dynamics/Author/contactAuthor';
import Infos from './pages/dynamics/Infos';
import Info from './pages/dynamics/Info';

//admin
import Login from './pages/Admin/Auth/Login';
import Dashboard from './pages/Admin/Dashboard';
import LogoutSuccess from './pages/Admin/Auth/LogoutSuccess';
import UpdatePost from './components/Admin/Infos/update';
import UpdateAuthor from './components/Admin/Authors/update';
import UpdateBook from './components/Admin/Books/update';
import ProtectedRoute from './components/Routes';

//components
import CreateAuthor from './components/Admin/Authors/create';

function App() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [user, setUser] = useAtom(userAtom);

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

  useEffect(() => {
    const fetchData = async () => {
      const authorsData = await fetchAuthors();
      const booksData = await fetchBooks();
      setAuthors(authorsData);
      setBooks(booksData);
    };

    fetchData();
  }, []);


  return (
    <div className='globale'>
      <Router>
        <NavBar />
        <Socialbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/abonnement" element={<Abo/>} />
          <Route path="/appel" element={<Call/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/mailsuccess" element={<MailSuccess/>} />
          <Route path="/ouvrages" element={<Books books={books}/>} />
          <Route path="/ouvrages/:id" element={<Book/>} />
          <Route path="/actus" element={<Infos/>} />
          <Route path="/actus/:id" element={<Info/>} />
          <Route path="/auteurices"  element={<Authors authors={authors} />} />
          <Route path="/auteurices/:id" element={<Author/>}/>
          <Route path="/auteurices/:id/contact" element={<ContactAuthor/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/logoutsuccess" element={<LogoutSuccess/>} />
          <Route path="/updatepost/:id" element={<UpdatePost/>} />
          <Route path="/updateauthor/:id" element={<UpdateAuthor/>} />
          <Route path="/updatebook/:id" element={<UpdateBook/>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
