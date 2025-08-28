// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/** Combina clases y resuelve conflictos de Tailwind */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
