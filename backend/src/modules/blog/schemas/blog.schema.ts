import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Blog {
  @Prop({ required: true, minlength: 6, maxlength: 255, type: String })
  title: string;

  @Prop({ required: true })
  image_src: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  keywords: string[];

  @Prop({ required: true })
  hastags: { id: string; name: string }[];

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

export type BlogType = HydratedDocument<Blog>;
