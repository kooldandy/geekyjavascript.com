import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { BlogsService } from './blog.service';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/blog.dto';

@ApiTags(Blog.name)
@Controller(Blog.name.toLowerCase())
export class BlogsController {
  constructor(private readonly blogssService: BlogsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get blog list' })
  @ApiOkResponse({ type: [CreateBlogDto] })
  async findAll() {
    return this.blogssService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one blog by id' })
  @ApiParam({ name: 'id', description: 'id of blog' })
  @ApiOkResponse({ type: CreateBlogDto })
  async findOne(@Param('id') id: string) {
    return this.blogssService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateBlogDto,
  })
  @ApiOperation({ summary: 'Create one blog' })
  async create(@Body() createCatDto: CreateBlogDto) {
    await this.blogssService.create(createCatDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: 202,
    description: 'The record has been successfully updated.',
    type: CreateBlogDto,
  })
  @ApiParam({ name: 'id', description: 'id of blog' })
  @ApiOperation({ summary: 'Update one blog by id ( all params )' })
  async update(@Body() createCatDto: CreateBlogDto) {
    await this.blogssService.create(createCatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: 202,
    description: 'The record has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'id of blog' })
  @ApiOperation({ summary: 'Delete one blog by id' })
  async delete(@Param('id') id: string) {
    return this.blogssService.delete(id);
  }
}
