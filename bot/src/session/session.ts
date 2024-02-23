import { session } from "grammy";
import { SessionData } from "../types";
import { freeStorage } from "@grammyjs/storage-free";

export const setupSession = (token: string) => {
	return session({
		initial(): SessionData {
			return {
				categoryId: 0,
				productId: 0,
				userInfo: null,
			};
		},
		storage: freeStorage<SessionData>(token),
	});
};
