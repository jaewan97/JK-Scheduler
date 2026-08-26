import { TagKey } from "./types";

interface TagStyle {
  dot: string;
  bg: string;
  text: string;
  ring: string;
  pillBg: string;
  pillText: string;
}

export const TAG_STYLES: Record<TagKey, TagStyle> = {
  coral: {
    dot: "bg-tag-coral",
    bg: "bg-tag-coral",
    text: "text-tag-coral",
    ring: "ring-tag-coral",
    pillBg: "bg-[#FF6B4A]/12",
    pillText: "text-[#E85A3A]",
  },
  blue: {
    dot: "bg-tag-blue",
    bg: "bg-tag-blue",
    text: "text-tag-blue",
    ring: "ring-tag-blue",
    pillBg: "bg-[#0A84FF]/12",
    pillText: "text-[#0A84FF]",
  },
  green: {
    dot: "bg-tag-green",
    bg: "bg-tag-green",
    text: "text-tag-green",
    ring: "ring-tag-green",
    pillBg: "bg-[#30D158]/12",
    pillText: "text-[#26A445]",
  },
  purple: {
    dot: "bg-tag-purple",
    bg: "bg-tag-purple",
    text: "text-tag-purple",
    ring: "ring-tag-purple",
    pillBg: "bg-[#BF5AF2]/12",
    pillText: "text-[#A93FDB]",
  },
  yellow: {
    dot: "bg-tag-yellow",
    bg: "bg-tag-yellow",
    text: "text-tag-yellow",
    ring: "ring-tag-yellow",
    pillBg: "bg-[#FFB300]/14",
    pillText: "text-[#B37D00]",
  },
  pink: {
    dot: "bg-tag-pink",
    bg: "bg-tag-pink",
    text: "text-tag-pink",
    ring: "ring-tag-pink",
    pillBg: "bg-[#FF375F]/12",
    pillText: "text-[#E22B50]",
  },
};
