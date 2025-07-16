// User-related Errors
export const USER_ALREADY_EXISTS = 'User with this email already exists';
export const USER_NOT_FOUND = 'User not found';
export const INVALID_USER_ID = 'Invalid user ID';
export const EMAIL_REQUIRED = 'Email is required';
export const PASSWORD_REQUIRED = 'Password is required';
export const NAME_REQUIRED = 'Name is required';
export const INVALID_OTP = 'Invalid OTP';
export const OTP_EXPIRED = 'OTP has expired';
export const Email_Not_Verify = 'Email is not Verify';

// Auth-related Errors
export const INVALID_CREDENTIALS = 'Invalid email or password';
export const UNAUTHORIZED_ACCESS = 'Unauthorized access';
export const TOKEN_EXPIRED = 'Authentication token has expired';
export const TOKEN_INVALID = 'Invalid authentication token';
export const ACCESS_DENIED = 'Access denied';

// Validation Errors
export const INVALID_EMAIL_FORMAT = 'Email must be a valid email address';
export const PASSWORD_TOO_SHORT = 'Password must be at least 6 characters long';
export const FIELD_REQUIRED = (field: string) => `${field} is required`;

// Database / System Errors
export const SOMETHING_WENT_WRONG = 'Something went wrong';
export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const RESOURCE_NOT_FOUND = 'Requested resource not found';
export const BAD_REQUEST = 'Bad request';
export const CONFLICT_ERROR = 'Conflict occurred';
export const DATABASE_ERROR = 'Database error occurred';

// File upload
export const FILE_TOO_LARGE = 'Uploaded file is too large';
export const UNSUPPORTED_FILE_TYPE = 'Unsupported file type';
export const FILE_UPLOAD_FAILED = 'File upload failed';

// Rate limiting / Throttling
export const TOO_MANY_REQUESTS = 'Too many requests. Please try again later.';

// Generic
export const OPERATION_FAILED = 'The operation could not be completed';
export const MISSING_PARAMETERS = 'Required parameters are missing';
