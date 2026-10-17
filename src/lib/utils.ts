import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const WA = "5512982256204";

export function waLink(text: string) {
  return `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(text)}`;
}
