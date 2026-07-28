import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import { Maximize2, X, Sparkles, Heart } from 'lucide-react';
import { luxuryAudio } from '../utils/audioSynth';

interface PhotoGallerySectionProps {
  photos: GalleryItem[];
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const handlePhotoClick = (item: GalleryItem) => {
    luxuryAudio.playClickSound();
    setSelectedPhoto(item);
  };

  const closeModal = () => {
    luxuryAudio.playClickSound();
    setSelectedPhoto(null);
  };

  return (
    <section id="gallery-section" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#d4af37]/30 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Gallery of Memories</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-normal text-slate-100"
        >
          Jejak Kenangan Indah
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base font-serif-luxury italic text-slate-400 max-w-md mx-auto"
        >
          Setiap foto menyimpan sejuta cerita, tawa, dan kehangatan yang kita ukir bersama.
        </motion.p>
      </div>

      {/* Apple / Pinterest Style Asymmetric Gallery Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
            onClick={() => handlePhotoClick(item)}
            className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl glass-panel p-3 border border-[#d4af37]/20 hover:border-[#d4af37]/60 glass-panel-hover transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl aspect-[3/4] sm:aspect-auto">
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/90 via-[#050814]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-1.5">
                  <span className="text-[10px] font-cinzel text-[#d4af37] tracking-[0.2em] uppercase">
                    {item.date || 'Memori'}
                  </span>
                  <h3 className="text-lg font-serif-luxury font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans line-clamp-2 italic font-light">
                    "{item.caption}"
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[#d4af37]">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Gold Framing Border */}
              <div className="absolute inset-2 border border-[#d4af37]/0 group-hover:border-[#d4af37]/40 rounded-lg pointer-events-none transition-all duration-500" />
            </div>

            {/* Static Caption Footer below card */}
            <div className="pt-3 px-1 flex justify-between items-center text-xs">
              <span className="font-serif-luxury font-medium text-slate-200">
                {item.title}
              </span>
              <Heart className="w-3.5 h-3.5 text-[#b76e79] fill-[#b76e79]/30 group-hover:fill-[#b76e79] transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#050814]/90 backdrop-blur-2xl"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full glass-panel rounded-3xl p-4 sm:p-6 border border-[#d4af37]/40 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-[#d4af37] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Expanded Image */}
              <div className="w-full md:w-2/3 max-h-[70vh] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/10">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Photo Caption Details */}
              <div className="w-full md:w-1/3 flex flex-col justify-center space-y-4 p-2 text-left">
                <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedPhoto.date || 'Memori Spesial'}</span>
                </div>

                <h3 className="text-2xl font-serif-luxury font-bold text-white">
                  {selectedPhoto.title}
                </h3>

                <div className="h-[1px] w-12 bg-[#d4af37]/50" />

                <p className="text-sm font-serif-luxury italic text-slate-300 leading-relaxed">
                  "{selectedPhoto.caption}"
                </p>

                <div className="pt-4 flex items-center gap-2 text-xs font-cinzel text-slate-400">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Momen Abadi Bersamamu</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
