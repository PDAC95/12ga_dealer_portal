export interface IDealer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
  phone?: string;
  role: 'dealer';
  isActive: boolean;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: true;
  data: {
    dealer: IDealer;
    token: string;
    expiresIn: string;
  };
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: true;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: true;
  message: string;
}

export interface GoogleAuthResponse {
  success: true;
  data: {
    dealer: IDealer;
    token: string;
    isNewUser: boolean;
  };
}

export interface AuthError {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
}
