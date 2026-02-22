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
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-6",
        scrolled || !isHome ? "glass-morphism py-4 shadow-2xl" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tighter">
            NAIMUR <span className="text-brand-gold">RASHID</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  location.pathname === link.href ? "text-brand-gold" : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://wa.me/8801984154464"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-brand-navy px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-lg shadow-brand-gold/20"
            >
              Hire Me
            </a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-navy pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-4xl font-serif font-bold transition-colors",
                    location.pathname === link.href ? "text-brand-gold" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10" />
              <a 
                href="https://wa.me/8801984154464"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif font-bold text-brand-gold"
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
  <footer className="bg-brand-navy pt-32 pb-16 text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-20 mb-24">
        <div className="col-span-2">
          <h2 className="text-4xl font-serif font-bold mb-8 tracking-tighter">NAIMUR <span className="text-brand-gold">RASHID</span></h2>
          <p className="text-slate-500 max-w-sm mb-10 leading-relaxed font-light">
            Executive Portfolio of Md Naimur Rashid. Driving innovation and sustainability 
            in the textile industry through advanced wet processing solutions.
          </p>
          <div className="flex gap-6">
            {[Globe, Briefcase, Award].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-all duration-500">
                <Icon size={20} />
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
