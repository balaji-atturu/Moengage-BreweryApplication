import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from "./components/Login"
import Signup from "./components/Signup"
import ResultDetail from './ResultDetail';



function App() {
  const [searchResults, setSearchResults] = useState([]); 

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/result/:index" element={<ResultDetail />} />
        <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/search" element={<Home searchResults={searchResults} setSearchResults={setSearchResults} />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="" element={<Login/>}/>
       
          {/* <Route path="/result/:index" element={<ResultPage searchResults={searchResults} />} /> */}
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
