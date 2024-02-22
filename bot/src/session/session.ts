import { session } from "grammy";
import { SessionData } from "../types";

export const setupSession = session({
  initial(): SessionData {
    return {
      categoryId: 0,
      productId: 0,
    };
  },
});
