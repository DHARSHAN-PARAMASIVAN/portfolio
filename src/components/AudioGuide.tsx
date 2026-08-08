"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { withBase } from "@/lib/paths";

type Mode = "off" | "voice" | "bgm";

/**
 * Soft procedural ambient bed + optional AI voiceover (intro.mp3).
 * Starts muted; user enables with one click (browser autoplay policy).
 */
export function AudioGuide() {
  const [mode, setMode] = useState<Mode>("off");
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode[]; gain: GainNode } | null>(null);

  const stopBgm = () => {
    nodesRef.current?.osc.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    nodesRef.current = null;
    if (ctxRef.current) {
      void ctxRef.current.close();
      ctxRef.current = null;
    }
  };

  const startBgm = async () => {
    stopBgm();
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.035;
    master.connect(ctx.destination);

    const freqs = [110, 164.81, 220, 329.63];
    const oscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      g.gain.value = 0.2 / (i + 1);
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.04 + i * 0.015;
      lfoGain.gain.value = 0.08;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      osc.connect(g);
      g.connect(master);
      osc.start();
      lfo.start();
      return osc;
    });

    nodesRef.current = { osc: oscs, gain: master };
  };

  const stopVoice = () => {
    const a = voiceRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  };

  const startVoice = async () => {
    stopVoice();
    const a = voiceRef.current;
    if (!a) return;
    a.volume = 0.9;
    try {
      await a.play();
    } catch {
      /* user gesture required — already in click handler */
    }
  };

  useEffect(() => {
    return () => {
      stopVoice();
      stopBgm();
    };
  }, []);

  const cycle = async () => {
    const next: Mode = mode === "off" ? "voice" : mode === "voice" ? "bgm" : "off";

    stopVoice();
    stopBgm();

    if (next === "voice") {
      await startVoice();
      // soft bed under voice
      await startBgm();
      if (nodesRef.current) nodesRef.current.gain.gain.value = 0.012;
    } else if (next === "bgm") {
      await startBgm();
    }

    setMode(next);
  };

  const label =
    mode === "off" ? "Audio off" : mode === "voice" ? "Voice + bed" : "Ambient only";

  return (
    <>
      <audio ref={voiceRef} src={withBase("/audio/intro.mp3")} preload="metadata" />
      <button
        type="button"
        onClick={() => void cycle()}
        className="mono inline-flex items-center gap-1.5 border border-line bg-panel px-2.5 py-2 text-[0.62rem] text-mute transition hover:border-accent hover:text-accent"
        aria-label={label}
        title={`${label} — click to cycle`}
      >
        {mode === "off" ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <span className="hidden sm:inline">
          {mode === "off" ? "AUDIO" : mode === "voice" ? "VOX" : "BGM"}
        </span>
      </button>
    </>
  );
}
