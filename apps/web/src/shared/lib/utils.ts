import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const delay = (milliseconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
