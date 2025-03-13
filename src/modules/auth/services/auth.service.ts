import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dto/login.dto';
import { errorInfo } from 'src/common/data/error.json';
import { TokenService } from 'src/common/services/token.service';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private userService: UsersService,
  ) {}

  async loginUser(entity: LoginDto) {
    const user = await this.userService.findOne({
      email: entity.email,
    });
    if (user) {
      const matched = await TokenService.decryptPassword(
        entity.password,
        user.password,
      );
      if (matched) {
        const id = user.id;
        const payload = {
          email: user.email,
          phone: user.phone.toString(),
          idNum: user.personal_id?.number,
        };

        const accessToken = await this.jwtService.sign(payload, {
          expiresIn: this.configService.get('TOKEN_TIMEOUT'),
          secret: this.configService.get('TOKEN_KEYWORD'),
        });
        // await this.userService.create(user);
        return { accessToken, id };
      }
      throw new HttpException(
        errorInfo.passwordIncorrect.message,
        errorInfo.passwordIncorrect.status,
        { cause: errorInfo.passwordIncorrect.code },
      );
    }
    throw new HttpException(
      errorInfo.userNotExist.message,
      errorInfo.userNotExist.status,
      { cause: errorInfo.userNotExist.code },
    );
  }
}
