
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
