
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Showcase from './pages/Showcase';
import Events from './pages/Events';
import GenAISolutions from './pages/GenAISolutions';
import AIProducts from './pages/AIProducts';
import Academy from './pages/Academy';
import AILabs from './pages/AILabs';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/events" element={<Events />} />
          <Route path="/genai-solutions" element={<GenAISolutions />} />
          <Route path="/ai-products" element={<AIProducts />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/ai-labs" element={<AILabs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/faq" element={<Legal type="faq" />} />
          {/* Admin Route - In real app, protect this with Auth */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
