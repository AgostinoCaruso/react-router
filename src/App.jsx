import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//layout
import DefaultLayout from './layout/defaultLayout';
//pages
import BooksPage from './pages/BooksPage';
import FormPage from './pages/FormPage';
import ContactUs from './pages/contactUs';
import AboutUs from './pages/aboutUs';
import BookPage from './pages/BookPage';
import PageNotFound from './pages/PageNotFound';

import { BooksContext } from './context/BooksContext';

function App() {

  const [books, setBooks] = useState([]);

  return (
    <>
      <BooksContext.Provider value={{books, setBooks}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              <Route path='book'>
                <Route index element={<BooksPage />} />
                <Route path=":id" element={<BookPage />} />
                <Route path="addBook" element={<FormPage />} />
              </Route>
              <Route path="contactus" element={<ContactUs />} />
              <Route path="aboutus" element={<AboutUs />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </BooksContext.Provider>
    </>
  );
}

export default App