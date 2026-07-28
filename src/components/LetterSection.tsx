import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, Feather } from 'lucide-react';
import { luxuryAudio } from '../utils/audioSynth';

interface LetterSectionProps {
  title: string;
  body: string;
  senderName: string;
  recipientName: string;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  title,
  body,
  senderName,
  recipientName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    luxuryAudio.playEnvelopeOpenSound();
    setIsOpen(true);
  };

  // Typewriter effect
  useEffect(() => {
    if (!isOpen) return;

    let currentIndex = 0;
    setTypedText('');
    setIsTypingComplete(false);

    const typingInterval = setInterval(() => {
      if (currentIndex < body.length) {
        setTypedText(body.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 28); // Smooth typewriter speed

    return () => clearInterval(typingInterval);
  }, [isOpen, body]);

  return (
    <section id="letter-section" className="relative py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-[#d4af37]/15 via-[#b76e79]/15 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#d4af37]/30 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase"
        >
          <Feather className="w-3.5 h-3.5" />
          <span>Private Letter</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-normal text-slate-100"
        >
          Surat dari Hati
        </motion.h2>

        <p className="text-xs sm:text-sm font-serif-luxury italic text-slate-400">
          Sentuh amplop di bawah ini untuk membaca ungkapan perasaan yang tersimpan.
        </p>
      </div>

      {/* Envelope Container */}
      <div className="relative flex flex-col items-center justify-center">
        {!isOpen ? (
          /* Closed Wax-Sealed Envelope */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenLetter}
            className="group relative w-full max-w-md aspect-[1.5/1] rounded-3xl glass-panel border-2 border-[#d4af37]/40 p-6 shadow-2xl flex flex-col justify-between items-center cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#d4af37] gold-glow"
          >
            {/* Envelope V Flap Design */}
            <div className="absolute top-0 inset-x-0 h-1/2 border-b-2 border-[#d4af37]/20 bg-gradient-to-b from-[#d4af37]/10 to-transparent clip-path-v-flap" />

            {/* Top Text */}
            <div className="relative z-10 pt-2 text-center">
              <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#d4af37] uppercase">
                CONFIDENTIAL & PERSONAL
              </span>
              <p className="text-sm font-serif-luxury text-slate-200 mt-1 italic">
                Untuk: {recipientName}
              </p>
            </div>

            {/* Center Wax Seal Button */}
            <div className="relative z-20 my-auto flex flex-col items-center gap-2">
              <div className="relative w-16 h-16 rounded-full bg-rose-metallic border-2 border-[#d4af37] shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-slate-950 fill-slate-950/20 group-hover:scale-110 transition-transform" />
                <span className="absolute -inset-1 rounded-full border border-[#d4af37]/40 animate-ping opacity-30" />
              </div>
              <span className="text-xs font-cinzel text-[#f3e5ab] tracking-widest uppercase font-semibold">
                Buka Surat
              </span>
            </div>

            {/* Bottom Accent */}
            <div className="relative z-10 flex items-center gap-1.5 text-[11px] font-sans text-slate-400">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Klik untuk membuka pesan penuh ketulusan</span>
            </div>
          </motion.div>
        ) : (
          /* Opened Letter Paper Container */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl rounded-3xl p-8 sm:p-12 glass-panel border border-[#d4af37]/50 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#0c122c]/90 via-[#0a0f28]/95 to-[#080c1f]"
          >
            {/* Premium Gold Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60" />

            {/* Watermark Crest */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <Heart className="w-72 h-72 text-[#d4af37]" />
            </div>

            {/* Letter Content */}
            <div className="relative z-10 space-y-6">
              {/* Letter Title */}
              <div className="border-b border-[#d4af37]/30 pb-4">
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-semibold text-gold-gradient">
                  {title}
                </h3>
              </div>

              {/* Typewritten Body */}
              <div className="min-h-[220px] text-base sm:text-lg font-serif-luxury italic leading-relaxed text-slate-200 whitespace-pre-wrap">
                {typedText}
                {!isTypingComplete && (
                  <span className="inline-block w-2 h-5 bg-[#d4af37] ml-1 animate-pulse" />
                )}
              </div>

              {/* Signature */}
              <AnimatePresence>
                {isTypingComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="pt-6 border-t border-[#d4af37]/20 flex flex-col items-end text-right space-y-1"
                  >
                    <span className="text-xs font-cinzel text-slate-400 tracking-widest uppercase">
                      Dengan Sepenuh Hati,
                    </span>
                    <span className="text-3xl font-script text-gold-gradient">
                      {senderName}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
