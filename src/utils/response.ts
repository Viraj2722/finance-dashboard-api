export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export function buildResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  meta?: Record<string, unknown>
): ApiResponse<T> {
  return {
    success,
    message,
    ...(data !== undefined && { data }),
    ...(meta && { meta }),
  };
}

export function successResponse<T>(
  message: string,
  data?: T,
  meta?: Record<string, unknown>
): ApiResponse<T> {
  return buildResponse(true, message, data, meta);
}

export function errorResponse<T>(
  message: string,
  data?: T,
  meta?: Record<string, unknown>
): ApiResponse<T> {
  return buildResponse(false, message, data, meta);
}
