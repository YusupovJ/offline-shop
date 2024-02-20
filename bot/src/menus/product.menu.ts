import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../session/session";
import { categories } from "../data";
import { InputMediaBuilder } from "grammy";

export const productMenu = new Menu<MyContext>("product__menu").dynamic((ctx) => {
  const range = new MenuRange<MyContext>();

  range.text(
    (ctx) => (ctx.session.productId === 0 ? " " : " < "),
    async (ctx) => {
      if (ctx.session.productId !== 0) {
        ctx.session.productId--;

        const product = categories[ctx.session.categoryId].products[ctx.session.productId];

        const image = InputMediaBuilder.photo(product.image);
        await ctx.editMessageMedia(image);
        await ctx.editMessageCaption({
          caption: product.description,
        });

        ctx.menu.update();
      }
    }
  );

  range.text((ctx) => `${ctx.session.productId + 1}/${categories[ctx.session.categoryId].products.length}`);

  range
    .text(
      (ctx) => (ctx.session.productId === categories[ctx.session.categoryId].products.length - 1 ? " " : " > "),
      async (ctx) => {
        if (ctx.session.productId !== categories[ctx.session.categoryId].products.length - 1) {
          ctx.session.productId++;

          const product = categories[ctx.session.categoryId].products[ctx.session.productId];

          const image = InputMediaBuilder.photo(product.image);
          await ctx.editMessageMedia(image);
          await ctx.editMessageCaption({
            caption: product.description,
          });

          ctx.menu.update();
        }
      }
    )
    .row();

  range
    .text("Add to cart", (ctx) => {
      ctx.reply("Added to cart");
    })
    .row();

  range.text("Back", async (ctx) => {
    const category = categories[ctx.session.categoryId];

    const image = InputMediaBuilder.photo(category.image);
    await ctx.editMessageMedia(image);
    await ctx.editMessageCaption({
      caption: category.description,
    });
    ctx.session.productId = 0;

    ctx.menu.back();
  });

  return range;
});
