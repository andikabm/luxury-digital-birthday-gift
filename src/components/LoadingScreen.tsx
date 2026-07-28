import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { luxuryAudio } from '../utils/audioSynth';

interface LoadingScreenProps {
  onOpen: () => void;
  senderName: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onOpen, senderName }) => {
  const handleOpenClick = () => {
    luxuryAudio.playClickSound();
    luxuryAudio.startMusic();
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050d] text-slate-100 overflow-hidden px-6"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#d4af37]/15 via-[#b76e79]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative luxury frame lines */}
      <div className="absolute inset-6 sm:inset-12 border border-[#d4af37]/15 rounded-3xl pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-center text-xs tracking-[0.3em] font-cinzel text-[#d4af37]/50 uppercase">
          <span>LUXURY EDITION</span>
          <span>EST. 2026</span>
        </div>
        <div className="flex justify-between items-center text-xs tracking-[0.3em] font-cinzel text-[#d4af37]/50 uppercase">
          <span>PRIVATE GIFT</span>
          <span>SPECIAL FOR YOU</span>
        </div>
      </div>

      <div className="relative z-10 max-w-lg text-center flex flex-col items-center gap-8">
        {/* Soft sparkling icon */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            <Sparkles className="w-7 h-7 text-[#d4af37] animate-pulse" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -inset-1 rounded-full border border-[#d4af37]/30 blur-xs"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-3"
        >
          <p className="text-xs font-cinzel tracking-[0.25em] text-[#d4af37] uppercase">
            A Message From The Heart
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-normal leading-relaxed text-slate-100 italic">
            "Ada seseorang yang ingin menyampaikan sesuatu untukmu..."
          </h1>
        </motion.div>

        {/* Big Luxury Glowing Button "Buka" */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-4"
        >
          <button
            onClick={handleOpenClick}
            id="open-gift-button"
            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full font-cinzel text-sm tracking-[0.25em] text-[#050814] bg-gold-metallic shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-500 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <span className="relative z-10 flex items-center gap-3 font-bold uppercase">
              Buka
              <Heart className="w-4 h-4 text-[#050814] fill-current group-hover:scale-125 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-[11px] font-sans tracking-widest text-slate-400 uppercase pt-4"
        >
          Gunakan Headphone atau Volume Suara untuk Pengalaman Terbaik
        </motion.p>
      </div>
    </motion.div>
  );
};
