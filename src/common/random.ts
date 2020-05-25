export function randomUpTo(value: number): number {
  return Math.round(Math.random() * value);
}

export function randomSign(): number {
  return Math.random() > 0.5 ? 1 : -1;
}

export function randomOfMagnitude(magnitude: number): number {
  return randomSign() * randomUpTo(magnitude);
}
