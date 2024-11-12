/* useMeasure Hook Types */
export type UseMeasureRect = Pick<DOMRectReadOnly, "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width">;
export type UseMeasureResult<E extends Element = Element> = [UseMeasureRef<E>, UseMeasureRect];
export type UseMeasureRef<E extends Element = Element> = (element: E) => void;
/* useMeasure Hook Types */

export interface RefillBucket {
  count: number;
  refilledAt: number;
}

export interface ExpiringBucket {
  count: number;
  createdAt: number;
}

export interface ThrottlingCounter {
  timeout: number;
  updatedAt: number;
}
