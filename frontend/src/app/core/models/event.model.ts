export interface EventModel {
  id: string;
  public_id?: string;
  name: string;
  date: string;
  time: string;
  capacity: number;
  street: string;
  city: string;
  price?: string | null;
  description?: string | null;
  banner?: string | null;
  cover?: string | null;
  status: string;
  user?: {
    id: string;
  };

  subscribers_count?: number;
  is_subscribed?: boolean;
}

export interface EventInput {
  name: string;
  date: string;
  time: string;
  capacity: string | number;
  street: string;
  city: string;
  price?: string | null;
  description?: string | null;
}

export interface PaginatorInfo {
  hasMorePages: boolean;
  currentPage: number;
  lastPage: number;
  total: number;
}

export interface PaginatedEventResponse {
  data: EventModel[];
  paginatorInfo: PaginatorInfo;
}
