import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً بك في مطعم رضا الله! كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const updatedMessages = [...messages, { role: 'user', content: userMessage } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });
      
      const data = await response.json();
      
      if (data.text) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.text }]);
      } else {
        throw new Error('No response text');
      }
    } catch (error) {
      console.error(error);
      setMessages([...updatedMessages, { role: 'assistant', content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-surface border border-surface-lighter rounded-sm shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-surface-soft p-4 border-b border-surface-lighter flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-flame flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-sm">Guest Assistant</h4>
                  <p className="text-[10px] text-green-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="block w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#0a0a0a]" dir="auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] ${msg.role === 'user' ? 'self-end bg-surface-lighter text-white' : 'self-start bg-gold/10 border border-gold/20 text-gray-100'} p-3 rounded-sm text-sm`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="self-start max-w-[85%] bg-gold/10 border border-gold/20 p-3 rounded-sm text-sm text-gold animate-pulse flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                   <div className="w-1.5 h-1.5 bg-gold rounded-full delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-gold rounded-full delay-150"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="bg-surface-soft p-3 border-t border-surface-lighter flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our menu..."
                className="flex-1 bg-surface border border-surface-lighter rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
                dir="auto"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-flame hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-flame text-white p-2 w-10 disabled:cursor-not-allowed rounded-sm flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-flame hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-flame/20 transition-all z-50 group hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />}
      </button>
    </>
  );
}
