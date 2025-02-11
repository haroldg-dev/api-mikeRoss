import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserModel } from '../schema/user.schema';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class UsersService extends BaseService<IUserModel> {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserModel>,
  ) {
    super(userModel);
  }

  async updateInfo(
    id: string,
    data: Partial<IUserModel>,
  ): Promise<IUserModel | null> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async getByNumber(phone: string): Promise<IUserModel | null> {
    return this.userModel.findOne({ phone }).exec();
  }

  async pushChat(id: string, chat: string): Promise<IUserModel | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $push: { chats: chat } }, { new: true })
      .exec();
  }

  async pushOrder(id: string, order: string): Promise<IUserModel | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $push: { orders: order } }, { new: true })
      .exec();
  }
}
