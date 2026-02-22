import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Briefcase, Award } from 'lucide-react';
import { cn } from './lib/utils';
import Home from './pages/Home';
import Certifications from './pages/Certifications';
import Developments from './pages/Developments';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Developments', href: '/developments' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
        scrolled || !isHome ? "glass-morphism py-3 shadow-lg" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-brand-navy tracking-tight">
            NAIMUR <span className="text-brand-gold">RASHID</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href ? "text-brand-gold" : "text-brand-navy hover:text-brand-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://wa.me/8801984154464"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-navy text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-gold transition-all hover:shadow-lg"
            >
              Hire Me
            </a>
          </div>

          <button 
            className="md:hidden text-brand-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif font-bold text-brand-navy"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="https://wa.me/8801984154464"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif font-bold text-brand-gold"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-brand-navy pt-20 pb-10 text-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <h2 className="text-3xl font-serif font-bold mb-6 tracking-tight">NAIMUR <span className="text-brand-gold">RASHID</span></h2>
          <p className="text-slate-400 max-w-sm mb-8">
            Executive Portfolio of Md Naimur Rashid. Driving innovation and sustainability 
            in the textile industry through advanced wet processing solutions.
          </p>
          <div className="flex gap-4">
            {[Globe, Briefcase, Award].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
            <li><Link to="/certifications" className="hover:text-brand-gold transition-colors">Certifications</Link></li>
            <li><Link to="/developments" className="hover:text-brand-gold transition-colors">Developments</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li>Savar, Dhaka 1341</li>
            <li>+880 1984 154464</li>
            <li>mdnaimurrashid752@gmail.com</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} Md Naimur Rashid. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/developments" element={<Developments />} />
      </Routes>
      <Footer />
    </Router>
  );
}
