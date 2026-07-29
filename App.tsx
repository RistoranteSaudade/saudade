import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyBookBar from './components/StickyBookBar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Carta from './pages/Carta';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import BlogPost from './pages/BlogPost';
import Page from './pages/Page';
import NotFound from './pages/NotFound';
import RestaurantSchema from './components/RestaurantSchema';
import { SiteDataProvider } from './context/SiteDataContext';
import { VisualEditing } from '@sanity/visual-editing/react';

const SANITY_ENABLED = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <SiteDataProvider>
      <Router>
        <RestaurantSchema />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-secondary text-stone-200 font-sans selection:bg-primary/40 selection:text-accent">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/carta" element={<Carta />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/galleria" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/:slug" element={<Page />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <StickyBookBar />
        </div>
        {SANITY_ENABLED && <VisualEditing portal />}
      </Router>
    </SiteDataProvider>
  );
}

export default App;