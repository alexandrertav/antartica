"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export default function GlassCard({
  Icon,
  title,
  description,
  className,
}: GlassCardProps) {
  const gradientId = useId();

  return (
    <div
      className={cn(
        "inset-card-shadow relative overflow-hidden rounded-2xl p-6",
        className,
      )}
    >
      <div className="inset-card-shadow mb-4 inline-flex items-center justify-center rounded-lg p-2">
        <Icon
          className="h-8 w-8"
          strokeWidth={2}
          aria-hidden
          style={{ stroke: `url(#${gradientId})` }}
        />
        <svg width="0" height="0" className="absolute">
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(51, 183, 134, 1)" />
            <stop offset="100%" stopColor="rgba(56, 102, 175, 1)" />
          </linearGradient>
        </svg>
      </div>

      <h3 className="text-text-title text-lg font-semibold">{title}</h3>
      <p className="text-text-body mt-2 text-sm">{description}</p>
    </div>
  );
}
