// src/gpt/gpt.functions.ts
import { UsersService } from 'src/modules/users/services/users.service';
import { IChatModel } from 'src/modules/chats/schema/chat.schema';
import { IUserModel } from 'src/modules/users/schema/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreFunctions {
  constructor(private readonly userService: UsersService) {}

  async addUserInfo(params: any, chat: IChatModel, user: IUserModel) {
    console.log(JSON.stringify(params, null, 2));
    await this.userService.updateInfo(user._id.toString(), params);
    return 'User Info added successfully, now ask for confirmation of the order to save it';
  }

  async updateUserInfo(params: any, chat: IChatModel, user: IUserModel) {
    try {
      console.log(JSON.stringify(user, null, 2));
      const userInfo = await this.userService.getByNumber(user.phone);
      if (userInfo) {
        await this.userService.updateInfo(userInfo._id.toString(), params);
        return 'User Info updated successfully';
      } else {
        return 'User not found';
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      return 'Error updating user info';
    }
  }

  async getUserInfo(params: any, chat: IChatModel, user: IUserModel) {
    try {
      console.log(JSON.stringify(user, null, 2));
      const userInfo = await this.userService.getByNumber(user.phone);
      if (userInfo) {
        return JSON.stringify(userInfo);
      } else {
        return 'User not found';
      }
    } catch (error) {
      console.error('Error showing user info:', error);
      return 'Error showing user info';
    }
  }
}
