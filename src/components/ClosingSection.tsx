import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { luxuryAudio } from '../utils/audioSynth';

interface ClosingSectionProps {
  closingQuote: string;
  recipientName: string;
  senderName: string;
  onReplay: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  closingQuote,
  recipientName,
  senderName,
  onReplay,
}) => {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [showLoveModal, setShowLoveModal] = useState(false);

  const handleLoveClick = () => {
    luxuryAudio.playLoveSparkleSound();

    // 1. Trigger Canvas Confetti
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.75 },
      colors: ['#d4af37', '#e8b4b8', '#b76e79', '#ffffff', '#fef0c7'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d4af37', '#f3e5ab', '#e8b4b8'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d4af37', '#f3e5ab', '#e8b4b8'],
      });
    }, 250);

    // 2. Generate floating hearts array
    const newHearts: FloatingHeart[] = [];
    for (let i = 0; i < 24; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 90 + 5,
        size: Math.random() * 20 + 16,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 0.5,
      });
    }
    setFloatingHearts(newHearts);

    // 3. Show love declaration modal
    setShowLoveModal(true);
  };

  return (
    <section id="closing-section" className="relative py-28 px-4 sm:px-8 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Floating Hearts Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '100vh', opacity: 0, scale: 0.5, x: `${heart.x}vw` }}
            animate={{
              y: '-20vh',
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1],
              rotate: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'easeOut',
            }}
            className="absolute text-[#e8b4b8] drop-shadow-[0_0_12px_rgba(232,180,184,0.8)]"
            style={{ width: heart.size, height: heart.size }}
          >
            <Heart className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Main Closing Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 glass-panel rounded-3xl p-8 sm:p-14 border border-[#d4af37]/40 shadow-2xl space-y-8 flex flex-col items-center"
      >
        {/* Soft Crest */}
        <div className="w-14 h-14 rounded-full glass-panel border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] gold-glow">
          <Heart className="w-7 h-7 fill-[#d4af37]/20" />
        </div>

        {/* Closing Quote */}
        <div className="space-y-3 max-w-xl">
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-slate-100 italic leading-snug">
            "{closingQuote}"
          </h2>
          <p className="text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase pt-2">
            FOREVER & ALWAYS
          </p>
        </div>

        {/* Big Love Button "Aku Sayang Kamu ❤️" */}
        <div className="pt-4">
         <button
  onClick={handleLoveClick}
  id="love-declaration-button"
  className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-full font-cinzel text-sm sm:text-base tracking-[0.2em] text-[#050814] bg-rose-metallic shadow-[0_0_40px_rgba(232,180,184,0.5)] hover:shadow-[0_0_70px_rgba(232,180,184,0.8)] transition-all duration-500 transform hover:scale-105 active:scale-95 cursor-pointer font-bold"
>
  {/* Efek shimmer */}
  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

  {/* Isi tombol */}
  <div className="relative z-10 flex flex-col items-center leading-none">
    <span className="flex items-center gap-2 uppercase">
      Aku Sayang Kamu ❤️
    </span>

    <span className="mt-1 text-[9px] sm:text-[10px] font-medium tracking-[0.45em] uppercase text-[#050814]/65 group-hover:text-[#050814]/90 transition-all duration-300">
      — SENTUH —
    </span>
  </div>
</button>
        </div>
      </motion.div>

      {/* Love Declaration Popup Modal */}
      <AnimatePresence>
        {showLoveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050814]/90 backdrop-blur-2xl"
            onClick={() => setShowLoveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="relative max-w-md w-full glass-panel rounded-3xl p-8 border-2 border-[#d4af37]/60 shadow-2xl text-center space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoveModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-full bg-rose-metallic border border-[#d4af37] flex items-center justify-center text-[#050814] gold-glow">
                <Heart className="w-8 h-8 fill-current" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif-luxury font-bold text-gold-gradient">
                  Cintaku Selalu Untukmu
                </h3>
                <p className="text-sm font-serif-luxury italic text-slate-200 leading-relaxed">
                  Semoga setiap detik di usiamu yang baru ini selalu diliputi tawa, kedamaian, dan kebahagiaan sejati.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => setShowLoveModal(false)}
                  className="w-full py-3 rounded-full bg-gold-metallic text-[#050814] font-cinzel text-xs font-bold tracking-widest uppercase hover:opacity-95"
                >
                  Terima Kasih, Sayang ❤️
                </button>

                <button
                  onClick={() => {
                    setShowLoveModal(false);
                    onReplay();
                  }}
                  className="w-full py-2.5 rounded-full glass-panel text-slate-300 hover:text-white font-cinzel text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Putar Ulang Pengalaman</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
