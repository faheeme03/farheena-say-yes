import React from 'react';
import { motion } from 'framer-motion';

export default function CuteBearCharacter({ state = 'default' }) {
  // state: 'default' | 'shocked' | 'happy'

  return (
    <motion.div
      animate={
        state === 'happy'
          ? { y: [0, -12, 0], rotate: [-4, 4, -4] }
          : state === 'shocked'
          ? { x: [-4, 4, -4, 4, 0], rotate: [-3, 3, -3, 3, 0] }
          : { y: [0, -8, 0], rotate: [-1, 1, -1] }
      }
      transition={{
        repeat: state === 'shocked' ? 1 : Infinity,
        duration: state === 'happy' ? 2 : state === 'shocked' ? 0.4 : 3.2,
        ease: 'easeInOut',
      }}
      className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-lg flex items-center justify-center select-none"
    >
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Bear Ears */}
        <circle cx="42" cy="45" r="20" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3.5" />
        <circle cx="42" cy="45" r="11" fill="#FFC4D6" />
        <circle cx="118" cy="45" r="20" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3.5" />
        <circle cx="118" cy="45" r="11" fill="#FFC4D6" />

        {/* Bear Body */}
        <path
          d="M45 105 C32 120, 35 150, 58 152 L102 152 C125 150, 128 120, 115 105 Z"
          fill="#FFFDF9"
          stroke="#8E5B72"
          strokeWidth="3.5"
        />

        {/* Bear Head */}
        <rect x="30" y="40" width="100" height="78" rx="39" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3.5" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="48" cy="85" rx="9" ry="6" fill="#FFB3C6" opacity="0.8" />
        <ellipse cx="112" cy="85" rx="9" ry="6" fill="#FFB3C6" opacity="0.8" />

        {/* Dynamic Eyes based on state */}
        {state === 'happy' ? (
          <>
            {/* Happy curved smiling eyes */}
            <path d="M50 74 Q58 64 66 74" stroke="#4A2537" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M94 74 Q102 64 110 74" stroke="#4A2537" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        ) : state === 'shocked' ? (
          <>
            {/* Watery shocked eyes */}
            <ellipse cx="58" cy="74" rx="7.5" ry="8.5" fill="#4A2537" />
            <circle cx="56" cy="71" r="2.8" fill="#FFFFFF" />
            <circle cx="61" cy="78" r="1.5" fill="#FFFFFF" />
            <ellipse cx="102" cy="74" rx="7.5" ry="8.5" fill="#4A2537" />
            <circle cx="100" cy="71" r="2.8" fill="#FFFFFF" />
            <circle cx="105" cy="78" r="1.5" fill="#FFFFFF" />
            {/* Teardrops */}
            <path d="M48 88 C48 93, 44 95, 44 95 C44 95, 40 93, 40 88 C40 84, 44 80, 44 80 C44 80, 48 84, 48 88 Z" fill="#64B5F6" />
          </>
        ) : (
          <>
            {/* Default sparkling anime eyes */}
            <circle cx="58" cy="74" r="5.5" fill="#4A2537" />
            <circle cx="56" cy="72" r="1.8" fill="#FFFFFF" />
            <circle cx="102" cy="74" r="5.5" fill="#4A2537" />
            <circle cx="100" cy="72" r="1.8" fill="#FFFFFF" />
          </>
        )}

        {/* Snout & Nose */}
        <ellipse cx="80" cy="80" rx="8" ry="6" fill="#FFE5EC" />
        <ellipse cx="80" cy="78" rx="4" ry="2.8" fill="#8E5B72" />

        {/* Mouth based on state */}
        {state === 'happy' ? (
          <path d="M72 82 Q80 96 88 82 Z" fill="#E57373" stroke="#8E5B72" strokeWidth="2.5" />
        ) : state === 'shocked' ? (
          <ellipse cx="80" cy="86" rx="6" ry="8" fill="#E57373" stroke="#8E5B72" strokeWidth="2" />
        ) : (
          <>
            <path d="M80 81 C80 85, 75 86, 73 84" stroke="#8E5B72" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M80 81 C80 85, 85 86, 87 84" stroke="#8E5B72" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Crown on head (Shown when happy!) */}
        {state === 'happy' && (
          <g>
            <path
              d="M68 36 L72 22 L80 30 L88 22 L92 36 Z"
              fill="#FFD54F"
              stroke="#B78103"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="80" cy="27" r="2" fill="#FF8DA1" />
          </g>
        )}

        {/* Hands / Heart item */}
        {state === 'happy' ? (
          <>
            {/* Big beating pink heart in paws */}
            <path
              d="M80 102 C68 86, 44 94, 52 114 C58 128, 80 140, 80 142 C80 140, 102 128, 108 114 C116 94, 92 86, 80 102 Z"
              fill="#FF8DA1"
              stroke="#8E5B72"
              strokeWidth="3"
            />
            <circle cx="68" cy="104" r="3" fill="#FFFDF9" opacity="0.6" />
            <ellipse cx="54" cy="116" rx="11" ry="8.5" transform="rotate(25 54 116)" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3" />
            <ellipse cx="106" cy="116" rx="11" ry="8.5" transform="rotate(-25 106 116)" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="3" />
          </>
        ) : (
          <>
            {/* Paws holding a cute pink rose */}
            <circle cx="80" cy="116" r="9" fill="#FF8DA1" stroke="#8E5B72" strokeWidth="2.5" />
            <circle cx="80" cy="116" r="4.5" fill="#FFE082" />
            <ellipse cx="56" cy="116" rx="9" ry="7" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.5" />
            <ellipse cx="104" cy="116" rx="9" ry="7" fill="#FFFDF9" stroke="#8E5B72" strokeWidth="2.5" />
          </>
        )}
      </svg>
    </motion.div>
  );
}
