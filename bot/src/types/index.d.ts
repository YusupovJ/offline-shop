import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

export type MyConversation = Conversation<MyContext>;

export interface SessionData {
	category: {
		page: number;
		totalPages?: number;
		currentCategory?: ICategory;
	};
	user: {
		me?: IUser;
		searchUser?: IUser;
	};
	conversation: {};
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
	_id: string;
	title: string;
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
