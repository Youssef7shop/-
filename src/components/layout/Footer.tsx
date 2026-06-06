import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-surface-lighter pt-20 pb-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="col-span-1 md:col-span-1">
           <Link to="/" className="flex flex-col items-start mb-6">
            <span className="text-3xl font-serif font-bold text-white arabic mb-1">مطعم رضا الله</span>
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Premium BBQ</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 arabic">
            مطعم رضا الله – نكهة الأصالة في كل لقمة. جودة استثنائية وتجربة لا تُنسى في عالم المشاوي المغربية.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-surface-soft flex items-center justify-center text-gray-400 hover:text-flame transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface-soft flex items-center justify-center text-gray-400 hover:text-flame transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
           <h4 className="font-serif text-lg mb-6">Quick Links</h4>
           <ul className="flex flex-col gap-4 text-sm text-gray-400">
             <li><Link to="/menu" className="hover:text-white transition-colors">Our Menu</Link></li>
             <li><Link to="/checkout" className="hover:text-white transition-colors">Order Online</Link></li>
             <li><a href="#" className="hover:text-white transition-colors">My Account</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Rewards</a></li>
           </ul>
        </div>

        <div>
           <h4 className="font-serif text-lg mb-6">Legal</h4>
           <ul className="flex flex-col gap-4 text-sm text-gray-400">
             <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
           </ul>
        </div>

        <div>
           <h4 className="font-serif text-lg mb-6">Contact Us</h4>
           <ul className="flex flex-col gap-4 text-sm text-gray-400">
             <li className="flex items-start gap-3">
               <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
               <span>Kénitra, Morocco</span>
             </li>
             <li className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-gold shrink-0" />
               <span dir="ltr">+212 696 65 70 33</span>
             </li>
             <li className="flex items-center gap-3">
               <Mail className="w-5 h-5 text-gold shrink-0" />
               <span>contact@redaallahbbq.com</span>
             </li>
           </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-surface-lighter pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Reda Allah Restaurant. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Crafted for Excellence</p>
      </div>
    </footer>
  );
}
