"use client";

import { ReactNode, useEffect } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-[fadeIn_0.25s_ease]"
      />
      <div className="relative w-full max-w-md animate-sheet-up rounded-t-sheet bg-[#F9F9FB] pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-sheet sm:max-w-xl md:max-w-2xl">
        <div className="flex justify-center pb-2 pt-2.5">
          <span className="h-1 w-9 rounded-full bg-black/15" />
        </div>
        {children}
      </div>
    </div>
  );
}
