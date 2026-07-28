import React, { useState, useEffect } from 'react';
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
import { PersonalizationModal } from './components/PersonalizationModal';

export default function App() {
  const [config, setConfig] = useState<GiftConfig>(() => {
    const saved = localStorage.getItem('luxury_birthday_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSaveConfig = (newConfig: GiftConfig) => {
    setConfig(newConfig);
    localStorage.setItem('luxury_birthday_config', JSON.stringify(newConfig));
  };

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

      {/* SECTION 1: LOADING SCREEN */}
      <AnimatePresence>
        {!isUnlocked && (
          <LoadingScreen
            onOpen={handleOpenGift}
            senderName={config.senderName}
          />
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE CONTENT (UNLOCKED) */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 space-y-12 sm:space-y-20 pb-20"
        >
          {/* SECTION 2: HERO */}
          <HeroSection
            recipientName={config.recipientName}
            greetingTitle={config.greetingTitle}
            greetingSubtitle={config.greetingSubtitle}
            onExploreClick={handleScrollToGallery}
          />

          {/* SECTION 3: GALERI FOTO */}
          <PhotoGallerySection photos={config.photos} />

          {/* SECTION 4: VIDEO */}
          <VideoSection videoUrl={config.videoUrl} posterUrl={config.videoPoster} />

          {/* SECTION 5: SURAT */}
          <LetterSection
            title={config.letterTitle}
            body={config.letterBody}
            senderName={config.senderName}
            recipientName={config.recipientName}
          />

          {/* SECTION 6: COUNTDOWN */}
          <CountdownSection
            targetDateIso={config.nextBirthdayDate}
            recipientName={config.recipientName}
          />

          {/* SECTION 7: PENUTUP */}
          <ClosingSection
            closingQuote={config.closingQuote}
            recipientName={config.recipientName}
            senderName={config.senderName}
            onReplay={handleReplay}
          />

          {/* Footer Branding */}
          <footer className="text-center py-8 text-xs font-cinzel text-slate-500 tracking-[0.25em] border-t border-white/5 uppercase">
            Designed with Elegance & Love &bull; {config.recipientName} Edition
          </footer>
        </motion.div>
      )}

      {/* Floating Audio Controller */}
      <AudioPlayerController isUnlocked={isUnlocked} />

      {/* Floating Customization Modal */}
      <PersonalizationModal config={config} onSave={handleSaveConfig} />
    </div>
  );
}
