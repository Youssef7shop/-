import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { menuData, menuCategories } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const translatedName = t(item.nameTranslationKey || item.id + 'Name', { defaultValue: item.name }).toLowerCase();
    const translatedDesc = t(item.descTranslationKey || item.id + 'Desc', { defaultValue: item.description }).toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = translatedName.includes(searchLower) || translatedDesc.includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  // Map Arabic categories to keys for translation
  const categoryKeys: Record<string, string> = {
    "المشاوي المشكلة": "mixGrill",
    "الدجاج المشوي": "chicken",
    "الكفتة": "kefta",
    "السندويتشات": "sandwiches",
    "الوجبات العائلية": "family",
    "البطاطس المقلية": "fries",
    "المشروبات": "drinks",
    "الحلويات": "desserts"
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{t('menu')}</h1>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
           <button 
             onClick={() => setActiveCategory("All")}
             className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
               activeCategory === "All" ? 'bg-white text-surface' : 'bg-surface-soft text-gray-400 hover:text-white'
             }`}
           >
             {t('all')}
           </button>
           {menuCategories.map(cat => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                 activeCategory === cat ? 'bg-white text-surface' : 'bg-surface-soft text-gray-400 hover:text-white'
               }`}
             >
               {t(`categories.${categoryKeys[cat]}`)}
             </button>
           ))}
        </div>

        <div className="relative w-full md:w-64">
           <input 
             type="text" 
             placeholder={t('searchMenu')}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-surface-soft border border-surface-lighter rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
           />
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredMenu.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group flex flex-col h-full"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-surface-soft rounded-sm">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-surface/80 backdrop-blur-md px-4 py-2 text-gold font-serif font-semibold rounded-sm shadow-xl">
                  {item.price} MAD
                </span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif">{t(item.nameTranslationKey || item.id + 'Name', { defaultValue: item.name })}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{t(item.descTranslationKey || item.id + 'Desc', { defaultValue: item.description })}</p>
              
              <div className="flex items-center justify-between border-t border-surface-lighter pt-4 mt-auto">
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {item.calories} kcal
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="flex items-center gap-2 text-sm font-medium hover:text-flame transition-colors group/btn"
                >
                  <span>{t('addToCart')}</span>
                  <div className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center group-hover/btn:bg-flame group-hover/btn:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMenu.length === 0 && (
         <div className="text-center py-24 text-gray-500">
           <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
           <p className="text-lg font-serif">{t('noItemsFound')}</p>
         </div>
      )}
    </div>
  );
}
