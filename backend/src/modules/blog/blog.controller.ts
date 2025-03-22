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
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BlogsService } from './blog.service';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/blog.dto';
import { BlogQueryDto } from './dto/query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags(Blog.name)
@Controller(Blog.name.toLowerCase())
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get blog list with pagination, sorting and filtering',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiOkResponse({
    type: [CreateBlogDto],
    description: 'Returns paginated blogs with total count',
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: BlogQueryDto,
  ) {
    return this.blogsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get one blog by id' })
  @ApiParam({ name: 'id', description: 'id of blog' })
  @ApiOkResponse({ type: CreateBlogDto })
  async findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateBlogDto,
  })
  @ApiOperation({ summary: 'Create one blog' })
  async create(@Body(new ValidationPipe()) createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: 202,
    description: 'The record has been successfully updated.',
    type: CreateBlogDto,
  })
  @ApiParam({ name: 'id', description: 'id of blog' })
  @ApiOperation({ summary: 'Update one blog by id' })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateBlogDto: CreateBlogDto,
  ) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: 202,
    description: 'The record has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'id of blog' })
  @ApiOperation({ summary: 'Delete one blog by id' })
  async delete(@Param('id') id: string) {
    return this.blogsService.delete(id);
  }
}
