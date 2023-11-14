import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  AUTH_DATA_PROVIDER,
  AuthData,
  AuthDataProvider,
} from './auth-data-provider';
import { AuthorizationException } from '../exceptions';

const REFRESH_TOKEN_COOKIE_NAME = 'RefreshToken';
const REFRESH_TOKEN_EXPIRES_IN_DAYS = 5;
export const LOGIN_ADMIN_ID_COOKIE_NAME = 'LoginAdminId';
const LOGIN_LINK_EXPIRES_IN_SECONDS = 20;

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_DATA_PROVIDER) private authDataProvider: AuthDataProvider,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(
    phone: string,
    password: string,
    request: Request,
    response: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authDataProvider.provideByPhone(phone);
    if (!user) throw AuthorizationException.wrongCredentials();
    // const passwordIsValid = await this.passwordService.validate(
    //   password,
    //   user.passwordHash,
    // );
    // if (!passwordIsValid) throw AuthorizationException.wrongCredentials();

    return await this.sign(
      user.id,
      await this.authDataProvider.provideTokenDataById(user.id),
      response,
    );
  }

  // async refreshAccessToken(
  //   request: Request,
  //   response: Response,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];
  //   if (!refreshToken)
  //     throw new AuthorizationException(
  //       `No ${REFRESH_TOKEN_COOKIE_NAME} cookie`,
  //     );
  //   let refreshTokenData;
  //   try {
  //     refreshTokenData = this.jwtService.verify(refreshToken);
  //   } catch (e) {
  //     throw AuthorizationException.badRefreshToken();
  //   }
  //   const refreshTokenEntity = await this.revokeRefreshToken(
  //     refreshTokenData['id'],
  //   );
  //   const authData = await this.authDataProvider.provideTokenDataById(
  //     refreshTokenEntity.userId,
  //   );
  //
  //   return await this.sign(refreshTokenEntity.userId, authData, response);
  // }

  // private async revokeRefreshToken(id: string) {
  //   const token = await this.refreshTokenRepository.findOne(id);
  //   if (!token) {
  //     throw AuthorizationException.refreshTokenNotFound();
  //   }
  //   await this.refreshTokenRepository.remove(token);
  //   return token;
  // }

  // private async generateRefreshTokenEntity(
  //   adminId: string,
  // ): Promise<RefreshToken> {
  //   const token = RefreshToken.create(generateString(), adminId, new Date());
  //   await this.refreshTokenRepository.insert(token);
  //   return token;
  // }

  private async sign(
    userId: string,
    data: AuthData,
    response: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // const refreshToken = await this.generateRefreshTokenEntity(userId);
    // const signedRefreshToken = this.jwtService.sign(
    //   { id: refreshToken.id },
    //   { expiresIn: `${REFRESH_TOKEN_EXPIRES_IN_DAYS} days` },
    // );
    response.clearCookie(LOGIN_ADMIN_ID_COOKIE_NAME);
    // response.cookie(REFRESH_TOKEN_COOKIE_NAME, signedRefreshToken, {
    //   httpOnly: true,
    //   expires: DateTime.fromJSDate(new Date())
    //     .plus({ days: REFRESH_TOKEN_EXPIRES_IN_DAYS })
    //     .toJSDate(),
    // });
    return {
      accessToken: this.jwtService.sign(data, { expiresIn: '5 days' }),
      refreshToken: null,
    };
  }

  // async revokeAllRefreshTokensByUserId(userId: string) {
  //   await this.refreshTokenRepository.delete({ userId });
  // }
  //
  // async getAuthLink(userId: string, adminId: string): Promise<string> {
  //   const time = DateTime.fromJSDate(new Date())
  //     .plus({ second: LOGIN_LINK_EXPIRES_IN_SECONDS })
  //     .toJSDate();
  //   const authDto: AuthLinkDto = { adminId, time, userId };
  //   const queryString = new Buffer(JSON.stringify(authDto)).toString('base64');
  //   return `${this.configService.get(
  //     'FRONTEND_URL',
  //   )}/auth/login-by-link/?queryString=${queryString}`;
  // }

  // async loginByLink(
  //   userId: string,
  //   request: Request,
  //   response: Response,
  //   ip: string,
  //   bearer: string,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   const tokenData = await this.authUserDataRequest.getTokenDataById(userId);
  //   const accessToken = bearer.replace('Bearer ', '');
  //   const decoded = await this.jwtService.verify(
  //     accessToken,
  //     this.configService.get('JWT_SECRET'),
  //   );
  //   const adminId = decoded?.adminId;
  //   if (!adminId) {
  //     throw new UnauthorizedException('Try again');
  //   }
  //   await this.authHistoryRepository.insert(
  //     AuthHistory.create(userId, request.headers['user-agent'], ip, adminId),
  //   );
  //
  //   const token = await this.sign(userId, tokenData, response);
  //   response.cookie(LOGIN_ADMIN_ID_COOKIE_NAME, adminId, {
  //     httpOnly: true,
  //     expires: DateTime.fromJSDate(new Date())
  //       .plus({ days: REFRESH_TOKEN_EXPIRES_IN_DAYS })
  //       .toJSDate(),
  //   });
  //
  //   return token;
  // }

  // async restorePassword(email: string) {
  //   const user = await this.authDataProvider.provideByEmail(email);
  //   if (!user)
  //     throw new AuthorizationException(
  //       'Пользователя с таким email не существует',
  //     );
  // }
}
