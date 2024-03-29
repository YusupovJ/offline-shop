import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
