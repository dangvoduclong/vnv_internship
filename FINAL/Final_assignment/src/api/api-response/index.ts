// Response type for structured API response
export interface ApiResponse<TData> {
  data?: TData;
  message?: string;
  error?: Error;
  metadata?: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

export interface ResponseProps {
  data: Array<{
    id: string;
    keyword: string;
    count: number;
    isSuggestion: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  message: string;
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}
