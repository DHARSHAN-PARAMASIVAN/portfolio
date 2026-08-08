"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { withBase } from "@/lib/paths";

type Mode = "off" | "voice" | "bgm";

type AudioTalkValue = {
  mode: Mode;
  speaking: boolean;
  cycle: () => void;
};

const AudioTalkContext = createContext<AudioTalkValue | null>(null);

export function AudioTalkProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("off");
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<{ osc: OscillatorNode[]; gain: GainNode } | null>(null);

  const stopBgm = useCallback(() => {
    bgmRef.current?.osc.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    bgmRef.current = null;
  }, []);

  const stopVoice = useCallback(() => {
    const a = voiceRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setSpeaking(false);
  }, []);

  const startBgm = useCallback(
    async (gainValue = 0.035) => {
      stopBgm();
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();

      const master = ctx.createGain();
      master.gain.value = gainValue;
      master.connect(ctx.destination);

      const freqs = [110, 164.81, 220, 329.63];
      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = f;
        g.gain.value = 0.2 / (i + 1);
        osc.connect(g);
        g.connect(master);
        osc.start();
        return osc;
      });
      bgmRef.current = { osc: oscs, gain: master };
    },
    [stopBgm]
  );

  const startVoice = useCallback(async () => {
    const a = voiceRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.volume = 1;
    try {
      await a.play();
      setSpeaking(true);
    } catch {
      setSpeaking(false);
    }
  }, []);

  useEffect(() => {
    const a = voiceRef.current;
    if (!a) return;
    const onEnded = () => {
      setSpeaking(false);
      setMode((m) => (m === "voice" ? "off" : m));
      stopBgm();
    };
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, [stopBgm]);

  useEffect(() => {
    return () => {
      stopVoice();
      stopBgm();
      void ctxRef.current?.close();
    };
  }, [stopBgm, stopVoice]);

  const cycle = useCallback(async () => {
    const next: Mode = mode === "off" ? "voice" : mode === "voice" ? "bgm" : "off";
    stopVoice();
    stopBgm();

    if (next === "voice") {
      await startVoice();
      await startBgm(0.01);
    } else if (next === "bgm") {
      await startBgm(0.035);
    }
    setMode(next);
  }, [mode, startBgm, startVoice, stopBgm, stopVoice]);

  const value = useMemo(() => ({ mode, speaking, cycle }), [mode, speaking, cycle]);

  return (
    <AudioTalkContext.Provider value={value}>
      <audio ref={voiceRef} src={withBase("/audio/intro.mp3")} preload="metadata" />
      {children}
    </AudioTalkContext.Provider>
  );
}

export function useAudioTalk() {
  const ctx = useContext(AudioTalkContext);
  if (!ctx) throw new Error("useAudioTalk must be used within AudioTalkProvider");
  return ctx;
}
