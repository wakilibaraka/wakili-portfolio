"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Phase 5 — Ambient audio system.
 * Looped rain (filtered noise), typing ticks, and a coffee-pour sweep.
 * Everything is gated behind first user interaction and honours mute.
 */
export function useAmbientSound(defaultMuted = false) {
  const ctxRef = useRef<AudioContext | null>(null);
  const rainNodesRef = useRef<{ src: AudioBufferSourceNode; gain: GainNode; filter: BiquadFilterNode } | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [muted, setMuted] = useState(defaultMuted);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  // Gate behind first user interaction (same pattern as useTelephoneRing)
  useEffect(() => {
    const handleInteraction = () => {
      if (ensureCtx()) setIsAllowed(true);
    };
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [ensureCtx]);

  const startRain = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx || rainNodesRef.current) return;
    // 2s looped noise buffer through a lowpass = rain wash
    const len = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    const gain = ctx.createGain();
    gain.gain.value = 0.035;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    rainNodesRef.current = { src, gain, filter };
  }, [ensureCtx]);

  const stopRain = useCallback(() => {
    const nodes = rainNodesRef.current;
    if (!nodes) return;
    try {
      nodes.src.stop();
    } catch {
      /* already stopped */
    }
    nodes.src.disconnect();
    nodes.gain.disconnect();
    nodes.filter.disconnect();
    rainNodesRef.current = null;
  }, []);

  // Start/stop the rain bed with allow + mute state
  useEffect(() => {
    if (!isAllowed || muted) {
      stopRain();
      return;
    }
    startRain();
  }, [isAllowed, muted, startRain, stopRain]);

  useEffect(() => stopRain, [stopRain]);

  /** Short mechanical tick for typing. */
  const playTick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !isAllowed || muted) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(1800 + Math.random() * 800, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }, [isAllowed, muted]);

  /** Soft pour sweep for coffee. */
  const playPour = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !isAllowed || muted) return;
    const dur = 0.6;
    const len = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + dur);
    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }, [isAllowed, muted]);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  return { isAllowed, muted, toggleMuted, setMuted, playTick, playPour };
}
