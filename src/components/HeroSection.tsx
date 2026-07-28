import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Gift } from 'lucide-react';
import { luxuryAudio } from '../utils/audioSynth';

interface HeroSectionProps {
  recipientName: string;
  greetingTitle: string;
  greetingSubtitle: string;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  greetingTitle,
  greetingSubtitle,
  onExploreClick,
}) => {
  const handleButtonClick = () => {
    luxuryAudio.playClickSound();
    onExploreClick();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20 text-center">

      {/* Luxury Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#b76e79]/15 to-[#fff3c4]/10 blur-[180px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex max-w-5xl flex-col items-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-white/5 px-5 py-2 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-[#d4af37]" />

          <span className="font-cinzel text-[11px] uppercase tracking-[0.35em] text-[#f3e5ab]">
            A Special Day For A Special Person
          </span>
        </motion.div>

        {/* Happy Birthday */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: .2 }}
          className="text-2xl uppercase tracking-[0.35em] text-slate-300 sm:text-4xl md:text-5xl font-cinzel"
        >
          {greetingTitle}
        </motion.h2>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: .4 }}
          className="mt-8"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif-luxury font-bold tracking-tight leading-none bg-gradient-to-r from-[#fff7d6] via-[#d4af37] to-[#fff3c4] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(212,175,55,.45)]">
            {recipientName}
          </h1>

          <div className="mx-auto mt-5 h-px w-44 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="mt-10 max-w-2xl text-lg italic leading-relaxed text-slate-300 sm:text-2xl font-serif-luxury"
        >
          "{greetingSubtitle}"
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: 1 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="mt-14"
        >
          <button
            id="hero-open-gift-btn"
            onClick={handleButtonClick}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#fff2b2] via-[#d4af37] to-[#b8860b] px-10 py-5 shadow-[0_0_40px_rgba(212,175,55,.35)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_70px_rgba(212,175,55,.75)]"
          >
            {/* Glow */}
            <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <span className="absolute inset-0 rounded-full bg-white/20 blur-xl"></span>
            </span>

            <span className="relative z-10 flex items-center gap-3 font-cinzel text-sm font-bold uppercase tracking-[0.28em] text-[#111]">
              <Gift className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

              Buka Hadiah

              <ChevronDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
            </span>
          </button>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={handleButtonClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2 opacity-60 transition hover:opacity-100">
          <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">
            Scroll
          </span>

          <ChevronDown className="h-5 w-5 text-[#d4af37]" />
        </div>
      </motion.div>

    </section>
  );
};