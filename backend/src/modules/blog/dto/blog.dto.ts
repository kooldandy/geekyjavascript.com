import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { 
  IsString, 
  IsArray, 
  IsUrl, 
  MinLength, 
  MaxLength, 
  IsNotEmpty, 
  ArrayMinSize,
  ValidateNested,
  IsDate,
  IsOptional,
  Matches
} from 'class-validator';

class HashtagDto {
  @ApiProperty({
    description: 'Unique identifier of the hashtag',
    example: 'js-123'
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    description: 'Name of the hashtag',
    example: 'javascript'
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Hashtag can only contain letters, numbers, and hyphens'
  })
  readonly name: string;
}

export class CreateBlogDto {
  @ApiProperty({
    description: 'Title of the blog post',
    example: 'Understanding TypeScript Generics',
    minLength: 6,
    maxLength: 255
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'URL of the blog post cover image',
    example: 'https://example.com/images/typescript-generics.jpg'
  })
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true
  })
  @IsNotEmpty()
  readonly image_src: string;

  @ApiProperty({
    description: 'Brief description of the blog post',
    example: 'Learn how to use TypeScript generics to write more reusable code',
    minLength: 10,
    maxLength: 1000
  })
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    description: 'Keywords for SEO',
    example: ['typescript', 'generics', 'programming'],
    isArray: true,
    minItems: 1
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly keywords: string[];

  @ApiProperty({
    description: 'Hashtags for categorization',
    example: [{ id: 'ts-1', name: 'typescript' }],
    type: [HashtagDto],
    isArray: true,
    minItems: 1
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => HashtagDto)
  readonly hashtags: HashtagDto[];

  @ApiProperty({
    description: 'Publication date of the blog post',
    example: '2024-03-22T10:00:00Z'
  })
  @Type(() => Date)
  @IsDate()
  readonly date: Date;

  @ApiProperty({
    description: 'Main content of the blog post in HTML format',
    example: '<h1>Understanding TypeScript Generics</h1><p>Content goes here...</p>',
    minLength: 100
  })
  @IsString()
  @MinLength(100)
  @IsNotEmpty()
  readonly content: string;
}

export class UpdateBlogDto extends CreateBlogDto {
  @ApiProperty({
    description: 'Publication status of the blog post',
    example: true,
    required: false
  })
  @IsOptional()
  readonly isPublished?: boolean;
}

export class BlogResponseDto extends CreateBlogDto {
  @ApiProperty({
    description: 'Unique identifier of the blog post',
    example: '507f1f77bcf86cd799439011'
  })
  readonly _id: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-03-22T10:00:00Z'
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-03-22T10:00:00Z'
  })
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'View count of the blog post',
    example: 1000
  })
  readonly viewCount: number;

  @ApiProperty({
    description: 'Publication timestamp',
    example: '2024-03-22T10:00:00Z',
    required: false
  })
  readonly publishedAt?: Date;
}
