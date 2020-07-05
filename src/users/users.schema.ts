import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import  * as uniqueValidator from 'mongoose-unique-validator';

@Schema()
export class User extends Document {
  
  _id:string;

  @IsEmail()
  @Prop({ required: true, unique:true })
  email: string;

  @IsNotEmpty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User).plugin(uniqueValidator);