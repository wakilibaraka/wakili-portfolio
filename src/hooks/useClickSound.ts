"use client";

import { useRef } from "react";

export function useClickSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      
      // A quick sharp high-to-low sweep sounds like a mechanical click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtxRef.current.currentTime + 0.05);
      
      // Fast attack and decay for volume
      gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      osc.start(audioCtxRef.current.currentTime);
      osc.stop(audioCtxRef.current.currentTime + 0.05);
    } catch (e) {
      // Ignore errors if audio context is blocked
    }
  };

  return { playClickSound };
}
