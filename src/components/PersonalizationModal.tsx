import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Save, Sparkles, Image, Mail, Heart, Calendar } from 'lucide-react';
import { GiftConfig } from '../types';
import { luxuryAudio } from '../utils/audioSynth';

interface PersonalizationModalProps {
  config: GiftConfig;
  onSave: (newConfig: GiftConfig) => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  config,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<GiftConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'photos'>('general');

  const handleOpen = () => {
    luxuryAudio.playClickSound();
    setFormData(config);
    setIsOpen(true);
  };

  const handleClose = () => {
    luxuryAudio.playClickSound();
    setIsOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    luxuryAudio.playClickSound();
    onSave(formData);
    setIsOpen(false);
  };

  const updatePhoto = (index: number, field: string, value: string) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = { ...updatedPhotos[index], [field]: value };
    setFormData({ ...formData, photos: updatedPhotos });
  };

  return (
    <>
      {/* Floating Gear Button in Bottom Left */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass-panel border border-[#d4af37]/40 text-[#d4af37] hover:text-white hover:border-[#d4af37] shadow-2xl transition-all hover:scale-110 flex items-center gap-2 group cursor-pointer"
        title="Ubah Data / Kustomisasi Gift"
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        <span className="hidden sm:inline font-cinzel text-[10px] tracking-widest text-[#f3e5ab] uppercase pr-1">
          Kustomisasi
        </span>
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050814]/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-2xl w-full max-h-[85vh] glass-panel rounded-3xl border border-[#d4af37]/50 shadow-2xl flex flex-col overflow-hidden text-slate-100"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg text-gold-gradient font-bold">
                      Kustomisasi Hadiah Digital
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Sesuaikan nama, surat, foto, dan tanggal untuk pasangan Anda
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10 bg-black/20 px-6">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-3 text-xs font-cinzel tracking-widest border-b-2 uppercase transition-colors ${
                    activeTab === 'general'
                      ? 'border-[#d4af37] text-[#d4af37] font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Informasi Utama
                </button>
                <button
                  onClick={() => setActiveTab('letter')}
                  className={`px-4 py-3 text-xs font-cinzel tracking-widest border-b-2 uppercase transition-colors ${
                    activeTab === 'letter'
                      ? 'border-[#d4af37] text-[#d4af37] font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Isi Surat
                </button>
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-4 py-3 text-xs font-cinzel tracking-widest border-b-2 uppercase transition-colors ${
                    activeTab === 'photos'
                      ? 'border-[#d4af37] text-[#d4af37] font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Galeri Foto ({formData.photos.length})
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1">
                {activeTab === 'general' && (
                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Nama Penerima (Yang Ulang Tahun)
                      </label>
                      <input
                        type="text"
                        value={formData.recipientName}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Nama Pengirim
                      </label>
                      <input
                        type="text"
                        value={formData.senderName}
                        onChange={(e) =>
                          setFormData({ ...formData, senderName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Sub-Judul Hero Greeting
                      </label>
                      <input
                        type="text"
                        value={formData.greetingSubtitle}
                        onChange={(e) =>
                          setFormData({ ...formData, greetingSubtitle: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Tanggal Ulang Tahun Berikutnya (Untuk Countdown)
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.nextBirthdayDate.slice(0, 16)}
                        onChange={(e) =>
                          setFormData({ ...formData, nextBirthdayDate: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        URL Video Memori (MP4)
                      </label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, videoUrl: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'letter' && (
                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Judul Surat
                      </label>
                      <input
                        type="text"
                        value={formData.letterTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, letterTitle: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Isi Surat Emosional
                      </label>
                      <textarea
                        rows={7}
                        value={formData.letterBody}
                        onChange={(e) =>
                          setFormData({ ...formData, letterBody: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100 italic"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">
                        Kalimat Penutup
                      </label>
                      <input
                        type="text"
                        value={formData.closingQuote}
                        onChange={(e) =>
                          setFormData({ ...formData, closingQuote: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/15 focus:border-[#d4af37] outline-none text-slate-100"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'photos' && (
                  <div className="space-y-4 text-xs font-sans">
                    {formData.photos.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className="p-4 rounded-xl glass-panel border border-white/10 space-y-2"
                      >
                        <div className="font-cinzel text-xs text-[#d4af37] font-semibold">
                          Foto #{idx + 1}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Judul Foto"
                            value={photo.title}
                            onChange={(e) => updatePhoto(idx, 'title', e.target.value)}
                            className="px-3 py-2 rounded-lg glass-panel border border-white/10 text-slate-100"
                          />
                          <input
                            type="text"
                            placeholder="Label Tanggal / Tag"
                            value={photo.date || ''}
                            onChange={(e) => updatePhoto(idx, 'date', e.target.value)}
                            className="px-3 py-2 rounded-lg glass-panel border border-white/10 text-slate-100"
                          />
                        </div>
                        <input
                          type="url"
                          placeholder="URL Gambar (https://...)"
                          value={photo.url}
                          onChange={(e) => updatePhoto(idx, 'url', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg glass-panel border border-white/10 text-slate-100"
                        />
                        <input
                          type="text"
                          placeholder="Caption Foto"
                          value={photo.caption}
                          onChange={(e) => updatePhoto(idx, 'caption', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg glass-panel border border-white/10 text-slate-100 italic"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full glass-panel text-slate-300 hover:text-white font-cinzel text-xs tracking-widest uppercase"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gold-metallic text-[#050814] font-cinzel text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-95"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
