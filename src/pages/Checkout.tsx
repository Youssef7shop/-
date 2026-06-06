import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Checkout() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [notes, setNotes] = useState("");

  const handleWhatsAppOrder = () => {
    let message = "السلام عليكم، أريد طلب:\n\n";
    cart.forEach(item => {
      message += `- ${item.name} (${item.quantity}x)\n`;
    });
    if (notes) {
      message += `\nملاحظات: ${notes}\n`;
    }
    message += `\nالمجموع: ${totalPrice} درهم`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212696657033?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-serif mb-6">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8 max-w-md">Discover our premium selection and find something you love.</p>
        <Link to="/menu" className="px-8 py-4 bg-white text-surface hover:bg-gold font-medium uppercase tracking-wide rounded-sm transition-all">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="border-t border-surface-lighter">
            {cart.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex items-center gap-6 py-6 border-b border-surface-lighter"
              >
                <div className="w-24 h-24 bg-surface-soft overflow-hidden rounded-sm shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                  <p className="text-gold font-medium">{item.price} MAD</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-surface-soft rounded-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium uppercase tracking-wider text-gray-400 mb-3">Order Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or delivery instructions?"
              className="w-full h-32 bg-surface-soft border border-surface-lighter rounded-sm p-4 focus:outline-none focus:border-gold transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <div>
          <div className="bg-surface-soft p-8 rounded-sm sticky top-32 border border-surface-lighter">
            <h3 className="text-xl font-serif mb-6 border-b border-surface-lighter pb-4">Order Summary</h3>
            
            <div className="flex justify-between mb-4 text-gray-400">
              <span>Subtotal</span>
              <span>{totalPrice} MAD</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-400">
              <span>Delivery Fee</span>
              <span>Calculated on WhatsApp</span>
            </div>
            
            <div className="flex justify-between mt-6 pt-6 border-t border-surface-lighter text-xl font-serif">
              <span>Total</span>
              <span className="text-gold">{totalPrice} MAD</span>
            </div>

            <button 
              onClick={handleWhatsAppOrder}
              className="w-full py-4 mt-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium uppercase tracking-wide rounded-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20"
            >
              Order via WhatsApp <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
              By placing your order, you will be redirected to WhatsApp to finalize delivery details with our staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
