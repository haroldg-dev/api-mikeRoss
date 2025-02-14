import { Model, Document, Types } from 'mongoose';

export class BaseService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async finAllByCursor(limit: number, cursor?: string): Promise<T[]> {
    const query = cursor ? { _id: { $gt: new Types.ObjectId(cursor) } } : {};
    return this.model.find(query).sort({ created_at: -1 }).limit(limit).exec();
  }

  async findOne(where: object): Promise<T | null> {
    return this.model.findOne(where).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const createdEntity = new this.model(data);
    return createdEntity.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
