import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollProgress from './components/ScrollProgress';
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

// Lazy load heavy components to split the bundle
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const Events = React.lazy(() => import("./components/Events"));
const Implementations = React.lazy(() => import("./components/Implementations"));
const Team = React.lazy(() => import("./components/Team"));

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <AboutUs />
        <Events />
        <Implementations />
        <Team />
      </Suspense>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;