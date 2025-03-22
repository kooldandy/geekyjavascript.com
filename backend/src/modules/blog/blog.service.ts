import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogType, Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogType>) {}

  async create(createBlogDto: CreateBlogDto): Promise<BlogType> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async findAll(): Promise<BlogType[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<BlogType> {
    return this.blogModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.blogModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
