"use client";

import { useEffect, useState } from "react";

export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setMessage(detail);
      window.setTimeout(() => setMessage(null), 2200);
    };
    window.addEventListener("dp-toast", onToast as EventListener);
    return () => window.removeEventListener("dp-toast", onToast as EventListener);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-14 left-1/2 z-[96] -translate-x-1/2 border border-line bg-ink px-4 py-2 text-paper shadow-lg">
      <p className="mono text-[0.68rem]">{message}</p>
    </div>
  );
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("dp-toast", { detail: message }));
}
