import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Globe, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const { cart } = useCart();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLangCode = i18n.language;
  const currentLang = LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const langMenuRef = useRef<HTMLDivElement>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const links = [
    { name: t('home'), path: '/' },
    { name: t('menu'), path: '/menu' },
    { name: t('checkout'), path: '/checkout' }
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 lg:px-12 py-4 ${
          scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-surface-lighter py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Link to="/" className="flex flex-col items-center group">
            <span className="text-2xl font-serif font-bold tracking-widest text-white group-hover:text-gold transition-colors arabic">{t('siteName')}</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Premium BBQ</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`hover:text-flame transition-colors ${location.pathname === link.path ? 'text-flame' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block" ref={langMenuRef}>
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                aria-haspopup="true"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-32 bg-surface border border-surface-lighter rounded-sm shadow-xl overflow-hidden"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-surface-soft ${
                          currentLang.code === lang.code ? 'text-gold bg-surface-soft' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/checkout" className="relative group">
              <ShoppingBag className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-flame text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button className="hidden md:block">
              <User className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
            </button>

            <button 
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-surface h-screen w-full p-6 flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold text-white arabic">{t('siteName')}</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-serif mb-8">
              {links.map((link) => (
                 <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-flame transition-colors ${location.pathname === link.path ? 'text-flame' : 'text-gray-300'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-surface-lighter pb-2">{t('language')}</h3>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`text-left px-4 py-3 rounded-sm text-sm border transition-colors ${
                      currentLang.code === lang.code 
                        ? 'border-gold text-gold bg-surface-soft' 
                        : 'border-surface-lighter text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pb-12 border-t border-surface-lighter pt-8">
               <button className="flex items-center gap-4 text-gray-300 hover:text-white">
                 <User className="w-6 h-6" />
                 <span className="text-lg">Sign In / Account</span>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
