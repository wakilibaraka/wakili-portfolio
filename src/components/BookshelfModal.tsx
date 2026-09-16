"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ExternalLink, Sparkles, Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  link: string;
  date: string;
}

interface BookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookshelfModal({ isOpen, onClose }: BookshelfModalProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (isOpen && posts.length === 0) {
      setLoading(true);
      fetch("https://barakalines.com/wp-json/wp/v2/posts?per_page=6")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPosts(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          setLoading(false);
        });
    }
  }, [isOpen, posts.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          {/* 3D Book Container */}
          <motion.div
            initial={{ scale: 0.75, rotateY: -25, z: -100 }}
            animate={{ scale: 1, rotateY: 0, z: 0 }}
            exit={{ scale: 0.8, rotateY: -15, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#f7f5ee] text-[#191816] rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden border-8 border-[#382015]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Book Spine / Leather Texture Header */}
            <div className="bg-gradient-to-r from-[#24140d] via-[#382015] to-[#24140d] text-[#f7f5ee] px-6 py-4 flex items-center justify-between border-b border-[#d4af37]/30">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#d4af37]" />
                <div>
                  <h3 className="font-serif text-lg tracking-wide text-[#f3cf65]">
                    Selected Writings & Legal Epistles
                  </h3>
                  <p className="text-[11px] text-[#d4af37]/80 uppercase tracking-widest">
                    Volume I • From BarakaLines
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#d4af37] hover:bg-white/10 transition-colors"
                aria-label="Close Book"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Book Pages Interior */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="text-center max-w-xl mx-auto mb-6">
                <p className="font-serif italic text-sm text-[#5e5750]">
                  "Thoughts on law, constitutional governance, technology, and writing."
                </p>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-[#5e5750]">
                  <Loader2 className="w-8 h-8 animate-spin text-[#c25e3e]" />
                  <p className="text-sm font-serif italic">Retrieving treatises from the archive...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <a
                      key={post.id}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-5 rounded-xl bg-white border border-[#e5decb] hover:border-[#c25e3e] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#c25e3e] uppercase tracking-wider mb-1.5 block">
                          Legal & Political Commentary
                        </span>
                        <h4
                          className="font-serif text-base font-semibold leading-snug group-hover:text-[#c25e3e] transition-colors mb-2"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div
                          className="text-xs text-[#5e5750] line-clamp-3 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f0ebd9] flex items-center justify-between text-xs text-[#c25e3e] font-semibold">
                        <span>Read Essay</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Book Bottom Bookmark */}
            <div className="bg-[#f0ece1] px-6 py-3 border-t border-[#e2dcce] flex items-center justify-between text-xs text-[#5e5750]">
              <span className="font-serif italic">Archived at barakalines.com</span>
              <a
                href="https://barakalines.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#c25e3e] font-semibold hover:underline"
              >
                <span>Browse Entire Library</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
