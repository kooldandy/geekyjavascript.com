import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogssService: BlogsService) {}

  @Post()
  async create(@Body() createCatDto: CreateBlogDto) {
    await this.blogssService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogssService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogssService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.blogssService.delete(id);
  }
}
