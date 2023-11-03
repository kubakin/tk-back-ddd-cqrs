export interface AuthData {
  id: string;
  email: string;
  passwordHash: string;
  roles: string[];
}

export const AUTH_DATA_PROVIDER = 'AUTH_DATA_PROVIDER';

export interface AuthDataProvider {
  provideByEmail(email: string): Promise<AuthData | null>;

  provideTokenDataById(id: string): Promise<any>;
}
