import * as bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jwt-simple';

export class TokenService {
  constructor() {}

  static async cryptPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  static async decryptPassword(
    password: string,
    passwordCipher: string,
  ): Promise<boolean> {
    const matches = await bcryptjs.compare(password, passwordCipher);
    return matches;
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static validateAccessToken(
    accessToken: string,
    tokenKeyWord: string,
  ): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(accessToken, tokenKeyWord);
        resolve(payload);
      } catch (error) {
        if (error.message.toLowerCase() === 'token expired') {
          reject({
            status: 409,
            message: 'El access token ha expirado',
          });
        } else {
          reject({
            status: 401,
            message: 'Debe loguearse',
          });
        }
      }
    });

    return promise;
  }
}
