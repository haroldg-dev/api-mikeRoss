import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { errorInfo } from '../data/error.json';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  canActivate(context: ExecutionContext) {
    const headers = context.switchToHttp().getRequest().headers;
    const authorizationHeader: string = headers.authorization;
    const apiKeyHeader: string = headers.apikey;
    if (apiKeyHeader) {
      const landginAccessToken = this.configService.get('LANDING_ACCESS_TOKEN');
      if (
        apiKeyHeader === landginAccessToken
      ) {
        const payload = this.jwtService.verify(apiKeyHeader, {
          secret: this.configService.get('SECRET_ACCESS_TOKEN'),
        });
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        request.user = payload;
        response.payload = payload;
        return true;
      } else {
        throw new HttpException(
          errorInfo.wrongToken.message,
          errorInfo.wrongToken.status,
          { cause: errorInfo.wrongToken.code },
        );
      }
    } else if (authorizationHeader) {
      const partsAuthentication = authorizationHeader.split(' ');
      if (partsAuthentication.length > 1) {
        const accessToken = partsAuthentication[1];
        try {
          const payload = this.jwtService.verify(accessToken, {
            secret: this.configService.get('TOKEN_KEYWORD'),
          });
          const response = context.switchToHttp().getResponse();
          const request = context.switchToHttp().getRequest();
          request.user = payload;
          response.payload = payload;
          return true;
        } catch (error) {
          if (error.name == 'TokenExpiredError') {
            throw new HttpException(
              errorInfo.expiredToken.message,
              errorInfo.expiredToken.status,
              { cause: errorInfo.expiredToken.code },
            );
          } else {
            throw new HttpException(
              errorInfo.wrongToken.message,
              errorInfo.wrongToken.status,
              { cause: error },
            );
          }
        }
      } else {
        throw new HttpException(
          errorInfo.missingToken.message,
          errorInfo.missingToken.status,
        );
      }
    } else {
      throw new HttpException(
        errorInfo.missingToken.message,
        errorInfo.missingToken.status,
      );
    }
  }
}
