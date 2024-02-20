import { ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor, session } from "grammy";

interface SessionData {
  categoryId: number;
  productId: number;
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;

export const setupSession = session({
  initial(): SessionData {
    return {
      categoryId: 0,
      productId: 0,
    };
  },
});
