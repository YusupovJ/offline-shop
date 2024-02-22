import { Menu, MenuRange } from "@grammyjs/menu";
import { categories } from "./../data/index";
import { InputMediaBuilder } from "grammy";
import { MyContext } from "../types";

export const categoryMenu = new Menu<MyContext>("category__menu").dynamic((ctx) => {
  const range = new MenuRange<MyContext>();

  range
    .text(
      (ctx) => categories[ctx.session.categoryId].name,
      async (ctx) => {
        ctx.menu.nav("product__menu");

        const product = categories[ctx.session.categoryId].products[0];

        const image = InputMediaBuilder.photo(product.image);
        await ctx.editMessageMedia(image);
        await ctx.editMessageCaption({
          caption: product.description,
        });
      }
    )
    .row();

  range.text(
    (ctx) => (ctx.session.categoryId === 0 ? " " : " < "),
    async (ctx) => {
      if (ctx.session.categoryId !== 0) {
        ctx.session.categoryId--;

        const category = categories[ctx.session.categoryId];

        const image = InputMediaBuilder.photo(category.image);
        await ctx.editMessageMedia(image);
        await ctx.editMessageCaption({
          caption: category.description,
        });
        await ctx.editMessageReplyMarkup({
          reply_markup: categoryMenu,
        });
      }
    }
  );

  range.text((ctx) => `${ctx.session.categoryId + 1}/${categories.length}`);

  range.text(
    (ctx) => (ctx.session.categoryId === categories.length - 1 ? " " : " > "),
    async (ctx) => {
      if (ctx.session.categoryId !== categories.length - 1) {
        ctx.session.categoryId++;

        const category = categories[ctx.session.categoryId];

        const image = InputMediaBuilder.photo(category.image);
        await ctx.editMessageMedia(image);
        await ctx.editMessageCaption({
          caption: category.description,
        });
      }
    }
  );

  return range;
});
