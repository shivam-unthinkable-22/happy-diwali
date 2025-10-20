"use client";

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

export default Crackers;
