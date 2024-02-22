import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

export type MyConversation = Conversation<MyContext>;

export interface SessionData {
  categoryId: number;
  productId: number;
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  description: string;
  products: ProductType[];
}
