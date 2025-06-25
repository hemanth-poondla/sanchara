import { useEffect, useState } from "react";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import FAQ from "../components/Landing/FAQ";
import Footer from "../components/Landing/Footer";
import Navbar from "../components/Landing/Navbar";
import HowItWorks from "../components/Landing/HowItWorks";
import Testimonials from "../components/Landing/Testimonials";
import ItineraryShowcase from "../components/Landing/ItineraryShowcase";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className={`font-[Jost] ${darkMode ? "dark" : "light"}`}>
      <div className="bg-[#d4ff6f] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 min-h-screen">
        <button
          className="fixed top-4 right-4 text-xl bg-white dark:bg-[#222] text-black dark:text-yellow-400 p-2 rounded-full shadow-md z-50"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <Navbar darkMode={darkMode} />
        <Hero darkMode={darkMode}/>
        <Features darkMode={darkMode}/>
        <HowItWorks darkMode={darkMode}/>
        <Testimonials darkMode={darkMode}/>
        <ItineraryShowcase darkMode={darkMode}/>
        <FAQ darkMode={darkMode}/>
        <Footer darkMode={darkMode}/>
      </div>
    </div>
  );
}


