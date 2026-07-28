import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface CountdownSectionProps {
  targetDateIso: string;
  recipientName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ targetDateIso, recipientName }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      let target = new Date(targetDateIso).getTime();

      // If target is in the past, default to next year's date
      if (isNaN(target) || target < now) {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        target = nextYear.getTime();
      }

      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  const cards = [
    { label: 'HARI', value: timeLeft.days },
    { label: 'JAM', value: timeLeft.hours },
    { label: 'MENIT', value: timeLeft.minutes },
    { label: 'DETIK', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown-section" className="relative py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-r from-[#d4af37]/15 via-[#b76e79]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#d4af37]/30 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Next Celebration</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-normal text-slate-100"
        >
          Menuju Hari Bahagia Berikutnya
        </motion.h2>

        <p className="text-xs sm:text-sm font-serif-luxury italic text-slate-400">
          Setiap detik menuju momen ulang tahun {recipientName} berikutnya adalah berkah yang patut disyukuri.
        </p>
      </div>

      {/* Glassmorphism Countdown Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {cards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="group relative rounded-2xl p-6 glass-panel border border-[#d4af37]/30 text-center flex flex-col items-center justify-center gap-2 shadow-xl hover:border-[#d4af37] transition-all duration-500 overflow-hidden"
          >
            {/* Shimmer top line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

            {/* Animated Flip Number */}
            <div className="relative h-14 sm:h-16 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={card.value}
                  initial={{ y: -25, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: 25, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-4xl sm:text-5xl font-cinzel font-bold text-gold-gradient tracking-tight"
                >
                  {String(card.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Label */}
            <span className="text-[10px] font-cinzel tracking-[0.3em] text-slate-400 uppercase font-semibold">
              {card.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
