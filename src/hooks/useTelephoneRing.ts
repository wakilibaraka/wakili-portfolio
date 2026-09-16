"use client";

import { useEffect, useRef, useState } from "react";

export function useTelephoneRing() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isAllowed, setIsAllowed] = useState(false);

  // Initialize Audio Context on first user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        setIsAllowed(true);
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
        setIsAllowed(true);
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const playRing = () => {
    if (!audioCtxRef.current || !isAllowed) return;
    
    // Create nodes
    const osc1 = audioCtxRef.current.createOscillator();
    const osc2 = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    // UK/Kenyan Vintage Ring frequencies
    osc1.frequency.value = 400;
    osc2.frequency.value = 450;
    osc1.type = 'square';
    osc2.type = 'square';
    
    // Connect
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    // Volume envelope (0.1 so it's not too loud)
    gain.gain.value = 0.05;
    
    osc1.start();
    osc2.start();
    
    oscillator1Ref.current = osc1;
    oscillator2Ref.current = osc2;
    gainNodeRef.current = gain;
  };

  const stopRing = () => {
    if (oscillator1Ref.current) {
      try { oscillator1Ref.current.stop(); } catch(e) {}
      oscillator1Ref.current.disconnect();
      oscillator1Ref.current = null;
    }
    if (oscillator2Ref.current) {
      try { oscillator2Ref.current.stop(); } catch(e) {}
      oscillator2Ref.current.disconnect();
      oscillator2Ref.current = null;
    }
  };
  
  const playPickUpClack = () => {
    if (!audioCtxRef.current || !isAllowed) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtxRef.current.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.1);
  };

  return { playRing, stopRing, playPickUpClack, isAllowed };
}
