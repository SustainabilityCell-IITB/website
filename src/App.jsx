import React, { Suspense, useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import LogoIntro from "./components/LogoIntro";
import Hero from "./components/Hero";
import ScrollProgress from './components/ScrollProgress';
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import CarbonCalculator from "./components/CarbonCalculator";

// Lazy load heavy components to split the bundle
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const Events = React.lazy(() => import("./components/Events"));
const Implementations = React.lazy(() => import("./components/Implementations"));
const Team = React.lazy(() => import("./components/Team"));

function App() {
  const basePath = (import.meta.env.BASE_URL || "").replace(/\/$/, "");
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const isGreenScorePage = currentPath === `${basePath}/green-score` || currentPath.endsWith("/green-score");

  // The film hands the logo over in two beats: `landed` un-hides the navbar
  // logo underneath the overlay's copy, then `finished` unmounts the overlay.
  const [landed, setLanded] = useState(false);
  const [finished, setFinished] = useState(false);
  const handleLanding = useCallback(() => setLanded(true), []);
  const handleFinish = useCallback(() => setFinished(true), []);

  if (isGreenScorePage) {
    return <CarbonCalculator />;
  }

  return (
    <div className="min-h-screen bg-white">
      {finished ? null : <LogoIntro onLanding={handleLanding} onFinish={handleFinish} />}
      <ScrollProgress />
      <Navbar logoHidden={!landed} />
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