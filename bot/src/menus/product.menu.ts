import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types";

export const productMenu = new Menu<MyContext>("product__menu").dynamic((ctx, range) => {});
