import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { errorInfo } from '../data/error.json';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    const role = context.switchToHttp().getResponse().payload.role;
    if (requiredRoles) {
      if (requiredRoles.includes(role)) {
        return true;
      }
    }
    throw new HttpException(
      errorInfo.notPrivileges.message,
      errorInfo.notPrivileges.status,
      {
        cause: errorInfo.notPrivileges.code,
      },
    );
  }
}
