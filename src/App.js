 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from "./components/Login"
import Signup from "./components/Signup"
import ResultDetail from './ResultDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/result/:index" element={<ResultDetail />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
