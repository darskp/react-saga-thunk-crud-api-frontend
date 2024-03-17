
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addbooks from './components/addBook';
import Navbar from './components/navbar';
import Booklist from './components/booklist.jsx';
import Readbooks from './components/readbook.jsx';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom/dist/index.js';

function App() {
  const [isEdit, setIsedit] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setIsedit={setIsedit} />
        <Routes>
          <Route path="/books" element={<Booklist setIsedit={setIsedit} />} />
          <Route path="/books/:id" element={<Readbooks />} />
          <Route path={isEdit ? "/editbook/:id" : "/addbook"} element={<Addbooks isEdit={isEdit} setIsedit={setIsedit} />} />
          <Route path="*" element={
            <Navigate to="/books" />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;