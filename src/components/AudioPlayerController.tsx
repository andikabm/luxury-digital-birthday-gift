import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { luxuryAudio } from '../utils/audioSynth';

interface AudioPlayerControllerProps {
  isUnlocked: boolean;
}

export const AudioPlayerController: React.FC<AudioPlayerControllerProps> = ({ isUnlocked }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      setIsPlaying(luxuryAudio.getIsPlaying());
    }
  }, [isUnlocked]);

  if (!isUnlocked) return null;

  const handleToggleMute = () => {
    const muted = luxuryAudio.toggleMute();
    setIsMuted(muted);
    luxuryAudio.playClickSound();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      luxuryAudio.stopMusic();
      setIsPlaying(false);
    } else {
      luxuryAudio.startMusic();
      setIsPlaying(true);
      setIsMuted(luxuryAudio.getIsMuted());
    }
    luxuryAudio.playClickSound();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <div className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-3 border border-[#d4af37]/30 shadow-2xl backdrop-blur-xl">
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-2 text-xs font-cinzel text-[#f3e5ab] hover:text-white transition-colors"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40">
            <Music className={`w-3.5 h-3.5 text-[#d4af37] ${isPlaying ? 'animate-pulse' : ''}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
              </span>
            )}
          </div>
          <span className="hidden sm:inline font-medium tracking-wider">
            {isPlaying ? 'AUDIO ON' : 'AUDIO OFF'}
          </span>
        </button>

        <div className="h-4 w-[1px] bg-white/15" />

        <button
          onClick={handleToggleMute}
          className="p-1.5 text-slate-300 hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#d4af37]" />
          )}
        </button>
      </div>
    </div>
  );
};