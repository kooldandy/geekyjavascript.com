import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

interface Hashtag {
  id: string;
  name: string;
}

@Schema({ timestamps: true })
export class Blog {
  @Prop({
    required: true,
    minlength: 6,
    maxlength: 255,
    type: String,
    trim: true,
    index: true
  })
  title: string;

  @Prop({
    required: true,
    type: String,
    validate: {
      validator: (v: string) => /^https?:\/\/.+/.test(v),
      message: 'Image URL must be a valid URL'
    }
  })
  image_src: string;

  @Prop({
    required: true,
    type: String,
    minlength: 10,
    maxlength: 1000,
    trim: true
  })
  description: string;

  @Prop({
    required: true,
    type: [String],
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: 'At least one keyword is required'
    }
  })
  keywords: string[];

  @Prop({
    required: true,
    type: [{
      id: { type: String, required: true },
      name: { type: String, required: true, trim: true }
    }],
    validate: {
      validator: (v: Hashtag[]) => Array.isArray(v) && v.length > 0,
      message: 'At least one hashtag is required'
    }
  })
  hashtags: Hashtag[];

  @Prop({
    required: true,
    type: Date,
    default: Date.now
  })
  date: Date;

  @Prop({
    required: true,
    type: String,
    minlength: 100,
    trim: true
  })
  content: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    index: true
  })
  author: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
    index: true
  })
  isPublished: boolean;

  @Prop({
    type: Number,
    default: 0
  })
  viewCount: number;

  @Prop({
    type: Date
  })
  publishedAt: Date;
}

export type BlogDocument = HydratedDocument<Blog>;
export const BlogSchema = SchemaFactory.createForClass(Blog);

// Add compound indexes for common queries
BlogSchema.index({ title: 'text', description: 'text' });
BlogSchema.index({ isPublished: 1, date: -1 });

// Add virtual fields if needed
BlogSchema.virtual('readTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Add pre-save middleware
BlogSchema.pre('save', function(next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Add methods if needed
BlogSchema.methods.incrementViews = async function() {
  this.viewCount += 1;
  return this.save();
};
