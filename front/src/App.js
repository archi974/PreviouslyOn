import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register"
import Home from "./pages/home"
import DetailSerie from "./pages/detailSerie"
import Profile from "./pages/profile"
import './App.css';

function App () {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<Register /> } />
          <Route path="/home" exact element={<Home /> } />
          <Route path="/home/:token" exact element={<Home /> } />
          <Route path="/profile" exact element={<Profile /> } />
          <Route path="/detail/serie/:id" exact element={<DetailSerie />}/>
        </Routes>
      </Router>
    );
}

export default App;