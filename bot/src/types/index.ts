import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

export type MyConversation = Conversation<MyContext>;

export interface SessionData {
  categoryId: number;
  productId: number;
  userInfo: IUser | null;
  searchingUser: IUser | null;
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  description: string;
  products: IProduct[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  tgId: number;
  role: "admin" | "user";
  _id: string;
}