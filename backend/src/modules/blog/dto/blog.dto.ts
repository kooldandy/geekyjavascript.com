import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    name: 'title',
    required: true,
    example: 'Hello blog',
  })
  readonly title: string;

  @ApiProperty({
    name: 'date',
    required: true,
    example: '1 Sept 203',
  })
  readonly date: string;

  @ApiProperty({
    name: 'content',
    required: true,
    example: '<p>first blog</p>',
  })
  readonly content: string;
}
