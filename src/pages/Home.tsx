import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { menuData } from '../data/menuData';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();
  const featuredMenu = menuData.filter(item => item.popular).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/40 to-surface z-10"></div>
          {/* Using a high-quality Unsplash image as a proxy for cinematic video */}
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=80" 
            alt="Cinematic BBQ" 
            className="w-full h-full object-cover scale-105 animate-[pulse_15s_ease-in-out_infinite_alternate]"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 arabic drop-shadow-2xl">
              {t('siteName')} <br/><span className="text-flame">{t('slogan')}</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl text-gray-200 mb-12 arabic font-light">
              {t('heroDesc')}
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4 arabic font-medium"
          >
            <Link to="/menu" className="w-full sm:w-auto px-8 py-4 bg-flame hover:bg-orange-600 text-white font-medium tracking-wide rounded-sm transition-all flex items-center justify-center gap-2">
              {t('viewMenu')}
            </Link>
            <Link to="/checkout" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-surface tracking-wide rounded-sm transition-all text-center">
              {t('orderNow')}
            </Link>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-surface-soft hover:bg-surface-lighter text-white tracking-wide rounded-sm transition-all text-center">
              {t('contactUs')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h4 className="text-gold uppercase tracking-widest text-sm font-semibold mb-4">{t('highlights')}</h4>
            <h2 className="text-4xl md:text-5xl font-serif">{t('signatureDishes')}</h2>
          </div>
          <Link to="/menu" className="group flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400 hover:text-white mt-6 md:mt-0 transition-colors">
            {t('fullMenu')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMenu.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 w-full overflow-hidden mb-6 bg-surface-soft">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-3 py-1 text-gold font-serif font-semibold rounded-sm">
                  {item.price} MAD
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2 group-hover:text-gold transition-colors">{t(item.nameTranslationKey || item.id + 'Name', { defaultValue: item.name })}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{t(item.descTranslationKey || item.id + 'Desc', { defaultValue: item.description })}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About The Experience Section */}
      <section className="py-24 bg-surface-soft">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
               <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80" alt="Grilling" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-gold rounded-full flex items-center justify-center p-4 bg-surface hidden md:flex">
              <div className="text-center">
                <span className="block text-4xl font-serif text-flame mb-2">10+</span>
                <span className="text-xs uppercase tracking-widest text-gray-400">{t('yearsExcellence')}</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h4 className="text-flame uppercase tracking-widest text-sm font-semibold mb-4">{t('ourStory')}</h4>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">{t('legacyOf')} <br/><span className="text-gold">{t('authenticHeat')}.</span></h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t('storyP1')}
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              {t('storyP2')}
            </p>
            <div className="flex items-center gap-4">
               <div className="w-12 h-px bg-gold"></div>
               <span className="uppercase tracking-widest text-sm">{t('discoverMore')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Summary */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-16">{t('customerReviews')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Review 1 */}
          <div className="bg-surface-soft p-8 rounded-sm border border-surface-lighter">
            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="w-5 h-5 text-gold fill-gold mx-0.5" />
              ))}
            </div>
            <p className="text-xl font-serif mb-6 arabic">{t('review1Text')}</p>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <span>{t('food')}: 5/5</span>
              <span>•</span>
              <span>{t('service')}: 5/5</span>
            </div>
          </div>
          {/* Review 2 */}
          <div className="bg-surface-soft p-8 rounded-sm border border-surface-lighter">
            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="w-5 h-5 text-gold fill-gold mx-0.5" />
              ))}
            </div>
            <p className="text-xl font-serif mb-6 arabic">{t('review2Text')}</p>
             <div className="flex justify-center gap-4 text-sm text-gray-400">
              <span>{t('food')}: 5/5</span>
              <span>•</span>
              <span>{t('service')}: 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 uppercase tracking-widest text-sm font-medium mt-16">— {t('averageRating')} 4.0/5</p>
      </section>
    </div>
  );
}
