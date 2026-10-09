"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, TerminalSquare } from "lucide-react";
import { useModalAccessibility } from "../hooks/useModalAccessibility";

export interface LaptopTerminalActions {
  openAbout: () => void;
  openWritings: () => void;
  openContact: () => void;
  openBooking: () => void;
  openMission: () => void;
  setNight: (night: boolean) => void;
}

interface LaptopTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  actions: LaptopTerminalActions;
}

type Line = { kind: "in" | "out" | "sys"; text: string };

const BANNER: Line[] = [
  { kind: "sys", text: "wakili@chambers — legal research shell v1.0" },
  { kind: "sys", text: "Type 'help' to see what you can do here." },
];

const HELP_LINES: Line[] = [
  { kind: "out", text: "  about      — open Emmanuel's dossier" },
  { kind: "out", text: "  writings   — open the bookshelf of essays" },
  { kind: "out", text: "  mission    — read the chambers' creed" },
  { kind: "out", text: "  contact    — ring the desk phone" },
  { kind: "out", text: "  booking    — request a consultation" },
  { kind: "out", text: "  night/day  — switch the office lights" },
  { kind: "out", text: "  weigh      — weigh evidence on the scales" },
  { kind: "out", text: "  ls, date, whoami, clear" },
];

export default function LaptopTerminalModal({ isOpen, onClose, actions }: LaptopTerminalModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  useModalAccessibility(isOpen, onClose, modalRef);

  // Focus the prompt whenever the terminal opens.
  // (Fresh output per visit comes from the parent remounting via `key`.)
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Keep the latest output in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, isOpen]);

  const print = (extra: Line | Line[]) =>
    setLines((prev) => [...prev, ...(Array.isArray(extra) ? extra : [extra])]);

  const openThen = (label: string, fn: () => void) => {
    print({ kind: "sys", text: label });
    setTimeout(() => {
      onClose();
      setTimeout(fn, 120);
    }, 450);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    print({ kind: "in", text: `$ ${cmd}` });

    const [base, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (base) {
      case "help":
        print(HELP_LINES);
        break;
      case "about":
      case "whoami":
        if (base === "whoami") {
          print({ kind: "out", text: "emmanuel baraka — lawyer & policy strategist, nairobi" });
        }
        openThen("Opening dossier…", actions.openAbout);
        break;
      case "writings":
      case "books":
      case "blog":
      case "essays":
        openThen("Fetching treatises from the archive…", actions.openWritings);
        break;
      case "mission":
      case "creed":
        openThen("Unsealing the chambers' creed…", actions.openMission);
        break;
      case "contact":
      case "phone":
      case "call":
      case "email":
        openThen("Ringing the desk phone…", actions.openContact);
        break;
      case "booking":
      case "book":
      case "consult":
        openThen("Preparing a consultation request…", actions.openBooking);
        break;
      case "night":
      case "lights":
        if (arg === "off" || arg === "out") {
          actions.setNight(false);
          print({ kind: "sys", text: "Lights on. The chambers brighten." });
        } else if (arg === "on" || base === "night") {
          actions.setNight(true);
          print({ kind: "sys", text: "Night mode. The banker's lamp takes over." });
        } else {
          actions.setNight(false);
          print({ kind: "sys", text: "Lights on. (try: night / lights off)" });
        }
        break;
      case "day":
      case "morning":
        actions.setNight(false);
        print({ kind: "sys", text: "Daylight. Nairobi skyline in view." });
        break;
      case "ls":
        print({ kind: "out", text: "about  writings  mission  contact  booking" });
        break;
      case "weigh":
      case "scales":
      case "verdict": {
        const verdicts = [
          "⚖️ The scales tip toward mercy — matter adjourned for tea.",
          "⚖️ Evidence weighed: 100% curiosity, 0% doubt sustained.",
          "⚖️ Objection overruled — the scales admire your persistence.",
          "⚖️ Judgment reserved… the scales need a recess (and a biscuit).",
        ];
        print({ kind: "out", text: verdicts[lines.length % verdicts.length] });
        break;
      }
      case "date":
        print({ kind: "out", text: new Date().toString() });
        break;
      case "echo":
        print({ kind: "out", text: rest.join(" ") || "" });
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        onClose();
        break;
      default:
        print({ kind: "sys", text: `command not found: ${base} — try 'help'` });
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setHistory((h) => [...h, value]);
    setHistoryIdx(-1);
    run(value);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(-1);
        setValue("");
      } else {
        setHistoryIdx(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Interactive office terminal"
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.85, y: 24 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, y: 12, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-2xl rounded-2xl p-1 bg-gradient-to-br from-shade-21 via-shade-22 to-accent-shadow shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-mono-950 text-emerald-400 rounded-[14px] overflow-hidden border border-mono-800">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-mono-900 border-b border-mono-800">
                <TerminalSquare className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-mono text-gray-400">zsh — root@wakili: interactive</span>
                <button
                  onClick={onClose}
                  className="ml-auto p-1.5 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                className="h-[46vh] md:h-[380px] overflow-y-auto px-4 py-3 font-mono text-xs md:text-sm leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((l, i) => (
                  <p
                    key={i}
                    className={
                      l.kind === "in"
                        ? "text-emerald-300 font-semibold"
                        : l.kind === "sys"
                          ? "text-yellow-400/90"
                          : "text-emerald-500/90"
                    }
                  >
                    {l.text || "\u00A0"}
                  </p>
                ))}

                {/* Prompt */}
                <form onSubmit={submit} className="flex items-center gap-2 mt-1">
                  <span className="text-emerald-300 font-semibold shrink-0">&gt;</span>
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent outline-none text-emerald-200 placeholder-emerald-700 caret-emerald-400 font-mono"
                    placeholder="type 'help'…"
                    aria-label="Terminal input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                  <span className="w-2 h-4 bg-emerald-400 animate-pulse shrink-0" aria-hidden="true" />
                </form>
              </div>

              {/* Hint bar */}
              <div className="px-4 py-2 border-t border-mono-800 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                <span>↑↓ history · esc closes</span>
                <span className="text-emerald-600">try: writings / night</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
