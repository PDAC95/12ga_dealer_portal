// Common types used across the application

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
