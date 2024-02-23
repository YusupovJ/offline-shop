import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  tgId: number;

  @Prop({ enum: ["user", "admin"], default: "user" })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
