// Success Response
export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error Response
export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
}

// Pagination
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
