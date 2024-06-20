import { Routes, Route } from "react-router-dom"
import Home from './components/home';
import { Login, Register, Dashboard } from "./components/login_register/index"
import * as books from "./components/books/index"
import Footer from './components/Footer';

import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<books.Details />} />
        <Route path="/list" element={<books.List />} />
        <Route path="/addBook" element={<books.AddBook />} />
        <Route path="/editBook" element={<books.EditBook />} />
        <Route path="/wishList" element={<books.WishList />} />
        <Route path="/favList" element={<books.FavList />} />
        <Route path="/sure" element={<books.YouSure />} />
        <Route path="/searchResults" element={<books.SearchResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
