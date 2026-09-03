export interface EventModel {
  id: string;
  name: string;
  date: string;
  time: string;
  capacity: number;
  location: string;
  price?: string | null;
  description?: string | null;
  banner?: string | null;
  cover?: string | null;
  user?: {
    id: string;
  };
}

export interface EventInput {
  name: string;
  date: string;
  time: string;
  capacity: string | number;
  location: string;
  price?: string | null;
  description?: string | null;
}
