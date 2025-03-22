import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogType, Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/blog.dto';
import { BlogQueryDto, SortOrder } from './dto/query.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogType>) {}

  async create(createBlogDto: CreateBlogDto): Promise<BlogType> {
    try {
      const createdBlog = new this.blogModel(createBlogDto);
      return await createdBlog.save();
    } catch (error) {
      throw new Error(`Failed to create blog: ${error.message}`);
    }
  }

  async findAll(
    query: BlogQueryDto,
  ): Promise<{ blogs: BlogType[]; total: number }> {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortOrder = SortOrder.DESC,
        sortBy = 'createdAt',
      } = query;
      const skip = (page - 1) * limit;

      // Build query
      const queryBuilder = this.blogModel.find();

      // Add search if provided
      if (search) {
        queryBuilder.or([
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ]);
      }

      // Add sorting
      queryBuilder.sort({ [sortBy]: sortOrder === SortOrder.ASC ? 1 : -1 });

      // Add pagination
      queryBuilder.skip(skip).limit(limit);

      // Execute query
      const [blogs, total] = await Promise.all([
        queryBuilder.exec(),
        this.blogModel.countDocuments(queryBuilder.getQuery()),
      ]);

      return { blogs, total };
    } catch (error) {
      throw new Error(`Failed to fetch blogs: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<BlogType> {
    try {
      const blog = await this.blogModel.findOne({ _id: id }).exec();
      if (!blog) {
        throw new NotFoundException(`Blog with ID ${id} not found`);
      }
      return blog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch blog: ${error.message}`);
    }
  }

  async update(id: string, updateBlogDto: CreateBlogDto): Promise<BlogType> {
    try {
      const updatedBlog = await this.blogModel
        .findByIdAndUpdate(id, updateBlogDto, { new: true })
        .exec();
      if (!updatedBlog) {
        throw new NotFoundException(`Blog with ID ${id} not found`);
      }
      return updatedBlog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update blog: ${error.message}`);
    }
  }

  async delete(id: string): Promise<BlogType> {
    try {
      const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
      if (!deletedBlog) {
        throw new NotFoundException(`Blog with ID ${id} not found`);
      }
      return deletedBlog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete blog: ${error.message}`);
    }
  }
}
