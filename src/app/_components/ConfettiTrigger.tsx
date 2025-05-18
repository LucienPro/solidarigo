"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export const ConfettiTrigger = () => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return null;
};
