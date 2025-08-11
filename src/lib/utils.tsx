import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de forma condicional y las optimiza para Tailwind.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
