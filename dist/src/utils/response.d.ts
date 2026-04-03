export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    meta?: Record<string, unknown>;
}
export declare function buildResponse<T>(success: boolean, message: string, data?: T, meta?: Record<string, unknown>): ApiResponse<T>;
export declare function successResponse<T>(message: string, data?: T, meta?: Record<string, unknown>): ApiResponse<T>;
export declare function errorResponse<T>(message: string, data?: T, meta?: Record<string, unknown>): ApiResponse<T>;
