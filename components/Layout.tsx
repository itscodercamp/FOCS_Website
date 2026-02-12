import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import ChatBot from './ChatBot';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Showcase', path: '/showcase' },
  { label: 'Events', path: '/events' },
  { label: 'GenAI', path: '/genai-solutions' },
  { label: 'Products', path: '/ai-products' },
  { label: 'Academy', path: '/academy' },
  { label: 'AI Labs', path: '/ai-labs' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

// Professional SVG Logo Component to match the brand request
const BrandLogo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex flex-col select-none">
    <div className="flex items-center tracking-tighter leading-none">
      <span className={`text-2xl md:text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'} transition-colors duration-300`}>F</span>
      {/* Stylized 'O' with gradient */}
      <div className="h-5 w-4 md:h-7 md:w-5 mx-0.5 bg-gradient-to-b from-sky-400 to-brand-600 rounded-lg shadow-sm"></div>
      <span className={`text-2xl md:text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'} transition-colors duration-300`}>CS</span>
    </div>
    <span className={`text-[7px] md:text-[8px] font-bold tracking-[0.2em] uppercase mt-1 ${dark ? 'text-slate-300' : 'text-slate-500'} transition-colors duration-300`}>
      Future of Computer Science
    </span>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Determine if we are on a page that needs a transparent header initially
  const isHomePage = location.pathname === '/';

  // Header styling logic
  const headerClasses = isMobileMenuOpen
    ? 'bg-white py-4 shadow-none' // Solid white when menu is open
    : isScrolled
      ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-100'
      : isHomePage
        ? 'bg-transparent py-4 md:py-6'
        : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100';

  return (
    <div className="flex flex-col min-h-screen font-sans w-full max-w-[100vw] overflow-x-hidden relative">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClasses}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative z-50">
          <Link
            to="/"
            className="flex items-center gap-2 group transform transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Logo is dark when menu is open */}
            <BrandLogo dark={isHomePage && !isScrolled && !isMobileMenuOpen} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 ${location.pathname === item.path
                    ? 'text-brand-500'
                    : (isHomePage && !isScrolled ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-brand-600')
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 ${isHomePage && !isScrolled
                  ? 'bg-white text-brand-900 hover:bg-brand-50 hover:text-brand-700'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
            >
              Get Started <ArrowRight size={14} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`xl:hidden p-2 transition-colors z-50 relative ${isHomePage && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-slate-900'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown - Full Screen Overlay */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6 overflow-y-auto no-scrollbar animate-fade-in">
            <div className="flex flex-col pb-20 space-y-2">
              {navItems.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl font-bold py-4 border-b border-slate-50 flex items-center justify-between group ${location.pathname === item.path ? 'text-brand-600' : 'text-slate-800'
                    }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {item.label}
                  <ChevronRight size={20} className={`transition-transform duration-300 ${location.pathname === item.path ? 'text-brand-600 translate-x-0' : 'text-slate-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </Link>
              ))}

              <div className="mt-8 pt-4">
                <Link
                  to="/contact"
                  className="block w-full bg-brand-600 text-white py-4 rounded-xl text-center font-bold shadow-lg shadow-brand-200 active:scale-[0.98] transition-transform"
                >
                  Start a Project
                </Link>
              </div>

              <div className="mt-8 flex justify-center gap-6 text-slate-400">
                <a href="#" className="hover:text-brand-600 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-brand-600 transition-colors"><Instagram size={20} /></a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* AI ChatBot Widget */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-dark-950 text-white pt-16 md:pt-24 pb-12 w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <BrandLogo dark={true} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mt-4">
              Pioneering the future of enterprise software and AI education. We bridge the gap between complex technology and business value.
            </p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-brand-600 hover:border-brand-500 hover:text-white text-slate-400 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 md:mb-8">Services</h3>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-brand-500 group-hover:w-2 transition-all"></span> Custom Development</Link></li>
              <li><Link to="/genai-solutions" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-brand-500 group-hover:w-2 transition-all"></span> GenAI Solutions</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-brand-500 group-hover:w-2 transition-all"></span> Web Applications</Link></li>
              <li><Link to="/ai-products" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-brand-500 group-hover:w-2 transition-all"></span> AI Products</Link></li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 md:mb-8">Academy</h3>
            <ul className="space-y-4">
              <li><Link to="/academy" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-2 transition-all"></span> Its Coder Camp</Link></li>
              <li><Link to="/academy" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-2 transition-all"></span> Student Training</Link></li>
              <li><Link to="/academy" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-2 transition-all"></span> Faculty Development</Link></li>
              <li><Link to="/ai-labs" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-2 transition-all"></span> Campus AI Labs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 md:mb-8">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-slate-400 group">
                <MapPin className="text-brand-500 mt-0.5 flex-shrink-0 group-hover:text-brand-400 transition-colors" size={18} />
                <span className="text-sm leading-relaxed">Nagpur<br />Maharashtra - 440034</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 group">
                <Mail className="text-brand-500 flex-shrink-0 group-hover:text-brand-400 transition-colors" size={18} />
                <span className="text-sm break-all">admin@focsit.in</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 group">
                <Phone className="text-brand-500 flex-shrink-0 group-hover:text-brand-400 transition-colors" size={18} />
                <span className="text-sm">+91 738 529 9597</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="container mx-auto px-4 md:px-6 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 gap-4">
          <p className="text-center md:text-left">© {new Date().getFullYear()} FOCS. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;