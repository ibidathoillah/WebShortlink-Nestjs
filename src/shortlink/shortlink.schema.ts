import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import  * as uniqueValidator from 'mongoose-unique-validator';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema({
  timestamps: { createdAt:true, updatedAt:true },
})
export class ShortLink extends Document {

  _id: Types.ObjectId

  @Prop({ required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique:true })
  slug: string;

  @Prop({ required: true })
  redirectUrl: string;

}

export const ShortLinkSchema = SchemaFactory
.createForClass(ShortLink)
.plugin(uniqueValidator)
.plugin(mongoosePaginate);