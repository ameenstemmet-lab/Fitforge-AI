/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Brain, ArrowDown } from 'lucide-react';
import { chatWithCoach } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey champion! I've analyzed your sleep data. You're recovered and ready to crush it today. What can I help you with?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role === 'assistant' ? 'model' : 'user', 
        parts: [{ text: m.content }] 
      }));
      const response = await chatWithCoach(history, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "Sorry, I couldn't process that. Let's keep moving!" }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between glass-dark sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-purple flex items-center justify-center text-white neon-glow-purple">
            <Brain size={24} />
          </div>
          <div>
            <h3 className="font-bold">Coach Forge</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Intelligence</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Sparkles size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar"
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-3xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-neon-purple text-white rounded-tr-none' 
                  : 'glass-dark border-white/10 rounded-tl-none'
              }`}>
                <div className="prose prose-invert prose-sm">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass-dark border-white/10 rounded-3xl p-4 rounded-tl-none flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 pb-28">
        <div className="glass rounded-[20px] p-2 flex items-center border-white/10 shadow-2xl">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your progress, form, or nutrition..."
            className="flex-1 bg-transparent px-4 py-2 outline-none text-sm placeholder:text-white/20 text-white font-medium italic"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="w-10 h-10 bg-neon-lime rounded-xl flex items-center justify-center text-black transition-all shadow-[0_0_15px_rgba(204,255,0,0.4)] active:scale-90 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
