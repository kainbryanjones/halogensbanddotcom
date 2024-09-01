import './App.css';

import { HashRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Blog from './containers/Blog/Blog';
import BlogView from './components/BlogView/BlogView';
import NotFound from './containers/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer';
import Contact from './containers/Contact/Contact';
import Home from './containers/Home/Home';

import meshgrid from "./assets/img/meshgrid.jpg"
import HeroImage from './components/HeroImage/HeroImage';

import heroImage from "./assets/img/heroImage.png"
import HalogensLogo from "./components/HalogensLogo/HalogensLogo"
import About from './containers/About/About';
import Music from './containers/Music/Music';
import Merch from './containers/Merch/Merch';
import { useEffect, useState } from 'react';



function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <HeroImage imgSrc={heroImage}>
            <HalogensLogo />
          </HeroImage>} />
      </Routes>
    </Router>
  );
}

export default App;
