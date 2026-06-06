import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Our Menu', path: '/menu' },
    { name: 'Checkout', path: '/checkout' }
  ];

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
            <span className="text-2xl font-serif font-bold tracking-widest text-white group-hover:text-gold transition-colors arabic">مطعم رضا الله</span>
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
            className="fixed inset-0 z-[60] bg-surface h-screen w-full p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold text-white arabic">مطعم رضا الله</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-serif">
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
