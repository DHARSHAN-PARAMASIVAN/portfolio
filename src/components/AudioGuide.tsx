"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAudioTalk } from "@/components/AudioTalkContext";

export function AudioGuide() {
  const { mode, cycle } = useAudioTalk();

  const label =
    mode === "off" ? "Audio off" : mode === "voice" ? "Voice intro" : "Ambient only";

  return (
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
  );
}
