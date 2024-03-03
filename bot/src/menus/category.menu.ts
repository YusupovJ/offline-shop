import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types";

export const categoryMenu = new Menu<MyContext>("category__menu").dynamic((ctx, range) => {});
