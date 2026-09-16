"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, ExternalLink, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: { rendered: string };
  slug: string;
  link: string;
}

export default function OverlayUI() {
  const [activeModal, setActiveModal] = useState<'none' | 'contact' | 'essays'>('none');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://barakalines.com/wp-json/wp/v2/posts?per_page=3")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      <header className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-4 pointer-events-auto cursor-pointer"
        >
          <h1 className="text-2xl font-bold text-accent">
            Emmanuel Baraka
          </h1>
          <p className="text-sm font-semibold text-text-muted">Advocate & Strategist</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-3 pointer-events-auto"
        >
          <button 
            onClick={() => setActiveModal('contact')}
            className="glass-panel px-4 py-3 hover:bg-white/60 transition-colors flex items-center gap-2"
          >
            <Mail className="w-5 h-5 text-accent" />
            <span className="font-bold text-text-main">Contact Me</span>
          </button>
          
          <button 
            onClick={() => setActiveModal('essays')}
            className="glass-panel px-4 py-3 hover:bg-white/60 transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="font-bold text-text-main">My Writing</span>
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {activeModal !== 'none' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto z-50"
            onClick={() => setActiveModal('none')}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-panel w-full max-w-md p-8 relative overflow-hidden bg-white/80"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal('none')}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5 text-text-main" />
              </button>

              {activeModal === 'contact' ? (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-accent">Let's Connect</h2>
                  <div className="space-y-6">
                    <a href="mailto:contact@barakalines.com" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-accent">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-muted">Email</p>
                        <p className="font-bold text-text-main">contact@barakalines.com</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-accent">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-muted">Phone</p>
                        <p className="font-bold text-text-main">+254 (0) 700 000 000</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-accent">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-muted">Office</p>
                        <p className="font-bold text-text-main">Nairobi, Kenya</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-accent">Recent Writings</h2>
                  <div className="space-y-4">
                    {posts.length > 0 ? posts.map(post => (
                      <a 
                        key={post.id} 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl bg-white/50 hover:bg-white border border-glass-border hover:border-accent transition-all group shadow-sm hover:shadow-md"
                      >
                        <h3 className="font-bold text-lg text-text-main mb-2 leading-tight group-hover:text-accent transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        <div className="flex items-center text-xs font-bold text-text-muted gap-2 uppercase tracking-widest">
                          <span>Read on BarakaLines</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    )) : (
                      <p className="text-text-muted font-semibold">Loading essays...</p>
                    )}
                  </div>
                  <a 
                    href="https://barakalines.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 w-full py-4 rounded-xl bg-accent text-white font-bold flex justify-center items-center gap-2 hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    Visit Full Publication
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
