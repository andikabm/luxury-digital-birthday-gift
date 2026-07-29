import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { defaultConfig } from './data/defaultConfig';
import { GiftConfig } from './types';
import { BackgroundSkyCanvas } from './components/BackgroundSkyCanvas';
import { AudioPlayerController } from './components/AudioPlayerController';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { VideoSection } from './components/VideoSection';
import { LetterSection } from './components/LetterSection';
import { CountdownSection } from './components/CountdownSection';
import { ClosingSection } from './components/ClosingSection';

export default function App() {
  const [config] = useState<GiftConfig>(defaultConfig);

  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleOpenGift = () => {
    setIsUnlocked(true);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-100 font-sans selection:bg-[#d4af37]/30 selection:text-[#f3e5ab] overflow-x-hidden">

      {/* Dynamic Starry Aurora Sky Background */}
      <BackgroundSkyCanvas />

      {/* Loading Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <LoadingScreen
            onOpen={handleOpenGift}
            senderName={config.senderName}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 space-y-12 sm:space-y-20 pb-20"
        >
          <HeroSection
            recipientName={config.recipientName}
            greetingTitle={config.greetingTitle}
            greetingSubtitle={config.greetingSubtitle}
            onExploreClick={handleScrollToGallery}
          />

          <PhotoGallerySection
            photos={config.photos}
          />

          <VideoSection
            videoUrl={config.videoUrl}
            posterUrl={config.videoPoster}
          />

          <LetterSection
            title={config.letterTitle}
            body={config.letterBody}
            senderName={config.senderName}
            recipientName={config.recipientName}
          />

          <CountdownSection
            targetDateIso={config.nextBirthdayDate}
            recipientName={config.recipientName}
          />

          <ClosingSection
            closingQuote={config.closingQuote}
            recipientName={config.recipientName}
            senderName={config.senderName}
            onReplay={handleReplay}
          />

          <footer className="text-center py-8 text-xs font-cinzel text-slate-500 tracking-[0.25em] border-t border-white/5 uppercase">
            Designed with Elegance &amp; Love • {config.recipientName} Edition
          </footer>
        </motion.div>
      )}

      {/* Floating Audio Controller */}
      <AudioPlayerController isUnlocked={isUnlocked} />

    </div>
  );
}