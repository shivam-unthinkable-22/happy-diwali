"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Crackers() {
  const [crackers, setCrackers] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * 100;
      const y = Math.random() * 50 + 10;
      const colors = ["#FFD700", "#FF69B4", "#00FFFF", "#FF4500", "#ADFF2F"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      setCrackers((prev) => [...prev.slice(-8), { id, x, y, color }]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {crackers.map((crack) => (
        <motion.div
          key={crack.id}
          className="absolute"
          style={{
            left: `${crack.x}%`,
            top: `${crack.y}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 2],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: crack.color,
                left: "0px",
                top: "0px",
              }}
              animate={{
                x: [0, Math.cos((i / 10) * 2 * Math.PI) * 40],
                y: [0, Math.sin((i / 10) * 2 * Math.PI) * 40],
                opacity: [1, 0.7, 0],
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const friend = searchParams.get("friend") || "My Friend";
  const [origin, setOrigin] = useState("");

  // ✅ Safe window handling for SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center bg-gradient-to-b from-[#1a1a2e] via-[#3a0ca3] to-[#000] text-white px-4">
      {/* 🎆 Crackers Background */}
      <Crackers />

      {/* ✨ Floating Diyas */}
      <div className="flex gap-4 sm:gap-6 md:gap-8 mb-10 flex-wrap justify-center mt-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 shadow-[0_0_50px_#facc15] border border-yellow-200"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.5,
            }}
          >
            <div className="absolute inset-0 flex items-start justify-center mt-1">
              <motion.div
                className="w-2 sm:w-3 h-5 sm:h-8 bg-gradient-to-t from-yellow-400 to-white rounded-full"
                animate={{
                  height: [20, 30, 20],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.3,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🪔 Greeting */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-500 drop-shadow-[0_0_25px_#facc15] leading-snug"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🪔 Happy Diwali, {friend}! 🪔
      </motion.h1>

      {/* 💫 Message */}
      <motion.p
        className="mt-6 max-w-md sm:max-w-xl text-base sm:text-lg text-gray-200 leading-relaxed px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        May your Diwali sparkle with moments of love, laughter, and light.  
        Wishing you endless happiness, glowing diyas, and joyful celebrations!
      </motion.p>

      {/* 🌟 Floating Sparkles */}
      <div className="absolute bottom-10 flex justify-center gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-300 rounded-full shadow-[0_0_15px_#facc15]"
            animate={{
              y: [0, -40, 0],
              opacity: [1, 0, 1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 text-xs sm:text-sm text-gray-400 text-center px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Made with 💛 by You
        <div className="mt-1 text-yellow-300 font-semibold break-all">
          {origin && `${origin}?friend=YourName`}
        </div>
      </motion.div>
    </main>
  );
}
