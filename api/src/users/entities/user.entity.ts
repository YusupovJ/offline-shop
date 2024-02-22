import { ObjectId } from "mongoose";

export class User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  tgId: number;
}
