import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Film, Volume2, VolumeX, Maximize } from 'lucide-react';
import { luxuryAudio } from '../utils/audioSynth';

interface VideoSectionProps {
  videoUrl: string;
  posterUrl: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl, posterUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    luxuryAudio.playClickSound();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    luxuryAudio.playClickSound();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    luxuryAudio.playClickSound();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="video-section" className="relative py-24 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-r from-[#b76e79]/15 via-[#d4af37]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#d4af37]/30 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase"
        >
          <Film className="w-3.5 h-3.5" />
          <span>Cinematic Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif-luxury font-normal text-slate-100"
        >
          Putaran Memori Indah
        </motion.h2>
      </div>

      {/* Cinema Style Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative rounded-3xl p-3 sm:p-5 glass-panel border border-[#d4af37]/30 shadow-2xl overflow-hidden group"
      >
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/60 shadow-inner flex items-center justify-center">
          {/* Native HTML5 Video */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            playsInline
            loop
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Video Overlay Overlay Gradient */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/80 via-[#050814]/30 to-transparent pointer-events-none" />
          )}

          {/* Big Elegant Central Play Button */}
          {!isPlaying && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-panel border border-[#d4af37] flex items-center justify-center text-[#d4af37] gold-glow cursor-pointer transition-all duration-300"
            >
              <Play className="w-8 h-8 fill-[#d4af37] translate-x-0.5" />
            </motion.button>
          )}

          {/* Hover Custom Player Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#050814]/90 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full glass-panel text-[#d4af37] hover:border-[#d4af37] transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full glass-panel text-slate-200 hover:text-[#d4af37] transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded-full glass-panel text-slate-200 hover:text-[#d4af37] transition-all"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
