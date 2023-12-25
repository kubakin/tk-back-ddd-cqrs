export interface AuthData {
  id: string;
  phone: string;
  isAdmin: boolean;
  password?: string;
}

export const AUTH_DATA_PROVIDER = 'AUTH_DATA_PROVIDER';

export interface AuthDataProvider {
  provideByPhone(email: string): Promise<AuthData | null>;

  provideTokenDataById(id: string): Promise<any>;
}
