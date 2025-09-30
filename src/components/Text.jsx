import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import React from "react";

function NeonGlowText({ text = "Neon", colors = ["#ff0080", "#00ff00", "#0000ff", "#ff00ff"], className = "" }) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      textShadow: colors.map((color) => `0 0 20px ${color}`).join(", "),
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      },
    });
  }, [colors, controls]);

  return (
    <motion.h1
      animate={controls}
      className={`text-6xl font-bold ${className}`}
      style={{
        color: colors[0],
      }}
    >
      {text}
    </motion.h1>
  );
}

// Demo/Example Usage
export default function NeonPulseText() {
  return (
    <div className="w-full h-full flex text-left">
      <NeonGlowText text="Barber SHOP CR" />
    </div>
  );
}