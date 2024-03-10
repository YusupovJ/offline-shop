import { session } from "grammy";
import { MyContext, SessionData } from "../types";
import { freeStorage } from "@grammyjs/storage-free";

export const setupSession = (token: string) => {
	return session<SessionData, MyContext>({
		type: "multi",
		category: {
			initial: () => ({
				page: 1,
			}),
		},
		user: {
			storage: freeStorage(token),
		},
		conversation: {},
	});
};
