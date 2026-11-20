import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import CuteBearCharacter from './components/CuteBearCharacter';
import { sounds } from './utils/audio';

export default function App() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [characterState, setCharacterState] = useState('default');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef(null);

  const noPhrases = [
    "No 🥺",
    "Are you sure? 🥺",
    "Really sure chellam? 💔",
    "Unaku manase illaya? 😭",
    "Think again! 🥺",
    "Look how big YES is! 👉",
    "No option illa! 😜",
    "Just click YES already! 🥹❤️",
    "You can't escape my love! 🏃‍♂️💨",
    "Forever yours nu sonna la? 🥺",
    "Okay now YES is too big to miss! 😂",
    "You HAVE to say YES! 😤💍"
  ];

  // Start soft romantic background audio on first interaction
  const handleInteractionStart = () => {
    sounds.startBGM();
  };

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // When "No" is hovered or clicked: Evade and grow "Yes"!
  const handleNoInteraction = (e) => {
    e?.preventDefault?.();
    handleInteractionStart();

    const nextCount = noCount + 1;
    setNoCount(nextCount);
    sounds.playEvasion(nextCount);

    // Briefly show shocked character reaction
    setCharacterState('shocked');
    setTimeout(() => {
      setCharacterState('default');
    }, 850);

    // Grow the YES button
    setYesScale((prev) => Math.min(prev + 0.4, 4.5));

    // Calculate a random displacement within container bounds
    const maxX = 120;
    const maxY = 65;
    const randomX = (Math.random() - 0.5) * maxX * 1.8;
    const randomY = (Math.random() - 0.5) * maxY * 1.8;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  // When "Yes" is clicked!
  const handleYesClick = () => {
    handleInteractionStart();
    sounds.playVictory();
    setHasAccepted(true);
    setCharacterState('happy');

    // Launch multi-burst celebration confetti
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#F497B6', '#FFB3C6', '#FFD54F', '#D84A6E', '#E83D66'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Reset the game
  const handleReset = () => {
    setHasAccepted(false);
    setNoCount(0);
    setYesScale(1);
    setCharacterState('default');
    setNoButtonPosition({ x: 0, y: 0 });
  };


  return (
    <div
      onClick={handleInteractionStart}
      className="relative min-h-screen w-full bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#FFF0F4] font-sans antialiased text-[#6D3B53] flex flex-col items-center justify-center p-4 select-none overflow-x-hidden"
    >
      {/* Ambient Floating Hearts & Sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-45">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute top-12 left-10 text-3xl"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [6, -6, 6] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute top-20 right-14 text-4xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute bottom-16 left-12 text-3xl"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
          className="absolute bottom-20 right-16 text-3xl"
        >
          💕
        </motion.div>
      </div>

      {/* Floating Audio Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleMute();
        }}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md border border-[#F497B6]/50 shadow-md text-[#6D3B53] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#8E5B72]" />
        ) : (
          <div className="flex items-center gap-1">
            <span className="w-1 bg-[#D84A6E] h-3 rounded-full animate-pulse" />
            <span className="w-1 bg-[#D84A6E] h-2 rounded-full animate-pulse delay-75" />
            <Volume2 className="w-4 h-4 text-[#D84A6E]" />
          </div>
        )}
      </button>

      {/* Main Interactive Card */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF9FB] to-[#FFEBF2] p-7 sm:p-10 shadow-[0_16px_40px_rgba(216,74,110,0.18)] border-2 border-[#F497B6]/60 text-center flex flex-col items-center justify-center my-auto transition-all"
      >
        <AnimatePresence mode="wait">
          {!hasAccepted ? (
            /* =================== VIEW 1: THE PROPOSAL QUESTION =================== */
            <motion.div
              key="question-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Cute Character */}
              <div className="mb-3">
                <CuteBearCharacter state={characterState} />
              </div>

              {/* Main Romantic Question */}
              <h1 className="font-script text-4xl sm:text-5xl font-bold text-[#6D3B53] leading-snug tracking-tight mb-2">
                Will you always be my princess, Farheena? 👑❤️
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base font-semibold text-[#8E5B72] mb-6">
                Pick an option chellam... think very carefully 🥺👉👈
              </p>

              {/* Buttons Arena */}
              <div className="relative w-full flex items-center justify-center gap-4 sm:gap-6 min-h-[110px] my-2">
                {/* YES BUTTON (Grows bigger on each NO attempt!) */}
                <motion.button
                  onClick={handleYesClick}
                  animate={{
                    scale: yesScale,
                  }}
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  style={{
                    fontSize: `${Math.min(18 + noCount * 5, 36)}px`,
                    padding: `${Math.min(14 + noCount * 6, 32)}px ${Math.min(32 + noCount * 12, 72)}px`,
                  }}
                  className="rounded-full bg-gradient-to-r from-[#F497B6] to-[#D84A6E] text-white font-bold shadow-[0_8px_30px_rgba(216,74,110,0.45)] hover:brightness-105 active:scale-95 transition-shadow z-30 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Yes! 🥰</span>
                  <Heart className="w-5 h-5 fill-white shrink-0" />
                </motion.button>

                {/* NO BUTTON (Evasive trickster) */}
                <motion.button
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  onMouseEnter={handleNoInteraction}
                  onClick={handleNoInteraction}
                  onTouchStart={handleNoInteraction}
                  transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                  className="px-6 py-3 rounded-full bg-white/95 text-[#7A445D] font-bold text-base border-2 border-[#F497B6]/70 shadow-md hover:bg-pink-50 active:scale-95 transition-colors z-20 cursor-pointer whitespace-nowrap"
                >
                  {noPhrases[Math.min(noCount, noPhrases.length - 1)]}
                </motion.button>
              </div>

              {/* Playful Evasion Hints */}
              <div className="min-h-[28px] mt-4">
                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={noCount}
                    className="text-xs sm:text-sm font-semibold text-[#C86D8A]"
                  >
                    {noCount === 1 && "Hey! Don't you dare click that! 😤"}
                    {noCount === 2 && "Are you really trying to say no to your Ikkaa?! 🥺"}
                    {noCount === 3 && "Look how huge YES is getting! Just click it! 👉"}
                    {noCount === 4 && "No chance chellam, you're forever mine! 💍"}
                    {noCount >= 5 && "There is literally no way you can escape saying YES! 🥰"}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ) : (
            /* =================== VIEW 2: THE YES CELEBRATION =================== */
            <motion.div
              key="celebration-view"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Dancing Crowned Bear */}
              <div className="mb-2">
                <CuteBearCharacter state="happy" />
              </div>

              {/* Heading */}
              <h2 className="font-script text-4xl sm:text-5xl font-extrabold text-[#6D3B53] tracking-tight mb-2">
                YAAAY! I KNEW IT! 🥰❤️
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#7A445D] font-medium max-w-sm mb-6 leading-relaxed">
                You are officially stuck with your Ikkaa forever, my princess Farheena! 💍👑
              </p>

              {/* Play again button */}
              <div className="flex justify-center w-full">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white text-[#7A445D] font-bold text-sm border border-[#F497B6]/70 shadow-sm hover:bg-pink-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#D84A6E]" />
                  <span>Play again ↺</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Signature */}
      <p className="mt-6 text-xs text-[#A87289] font-medium z-10 text-center">
        Made with all my heart for my princess Farheena ❤️ • By your Ikkaa
      </p>
    </div>
  );
}
