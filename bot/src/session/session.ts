import { session } from "grammy";
import { MyContext, SessionData } from "../types";
import { freeStorage } from "@grammyjs/storage-free";

export const setupSession = (token: string) => {
	return session<SessionData, MyContext>({
		type: "multi",
		pagination: {
			initial: () => ({
				categoryId: 0,
				productId: 0,
			}),
		},
		user: {
			storage: freeStorage(token),
		},
	});
};
