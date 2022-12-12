import './App.css';

import { HashRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Blog from './containers/Blog/Blog';
import BlogView from './components/BlogView/BlogView';
import NotFound from './containers/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer';
import Contact from './containers/Contact/Contact';
import MusicStore from './containers/MusicStore/MusicStore';
import Home from './containers/Home/Home';

import meshgrid from "./assets/img/meshgrid.jpg"
import HeroImage from './components/HeroImage/HeroImage';

import heroImage from "./assets/img/heroImage.png"
import HalogensLogo from "./components/HalogensLogo/HalogensLogo"
import About from './containers/About/About';
import Music from './containers/Music/Music';
import Merch from './containers/Merch/Merch';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <HeroImage imgSrc={heroImage}>
            <HalogensLogo />
          </HeroImage>} />
      </Routes>
      <div className="App" style={{
        backgroundImage: `url(${meshgrid})`,
        backgroundPosition: "50% 85%",
      }}>
        <div className="body-content" >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/music" element={<Music />} />
            <Route exact path='/blog' element={<Blog />} />
            <Route exact path="/store/music" element={<MusicStore />} />
            <Route exact path="/store/merch" element={<Merch />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/blog/post/:postId" element={<BlogView />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<>Missing Page / Error Page</>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
