import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Events from "./components/Events";
import Projects from "./components/Projects";
import Implementations from "./components/Implementations";
import Team from "./components/Team";
import Footer from "./components/Footer";
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <AboutUs />
      <Events />
      <Implementations />
      <Team />
      <Footer />
    </div>
  );
}

export default App;