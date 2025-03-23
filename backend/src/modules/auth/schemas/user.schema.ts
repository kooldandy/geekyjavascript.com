import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ 
    required: true, 
    unique: true,
    minlength: 3,
    maxlength: 50,
    type: String,
    trim: true
  })
  username: string;

  @Prop({ 
    required: true,
    minlength: 6,
    type: String,
    select: false // for security
  })
  password: string;

  @Prop({ 
    type: Date,
    default: Date.now,
    immutable: true
  })
  createdAt: Date;

  @Prop({ 
    type: Date,
    default: Date.now
  })
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User); 