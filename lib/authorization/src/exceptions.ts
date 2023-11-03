export class AuthorizationException extends Error {
  public static wrongCredentials() {
    return new AuthorizationException('Неверный email или пароль');
  }

  public static blocked() {
    return new AuthorizationException('Пользователь заблокирован');
  }

  public static refreshTokenNotFound() {
    return new AuthorizationException('Refresh token not found');
  }

  public static badRefreshToken() {
    return new AuthorizationException('Bad refresh token');
  }
}
