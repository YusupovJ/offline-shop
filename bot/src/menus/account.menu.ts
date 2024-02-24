import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types";
import query from "../config/axios.config";

export const accountMenu = new Menu<MyContext>("account__menu").dynamic((ctx, range) => {
  range.text("Change first name", async (ctx) => {
    await ctx.conversation.enter("changeFirstNameConversation");
  });
  range.text("Change last name", async (ctx) => {
    await ctx.conversation.enter("changeLastNameConversation");
  });

  if (ctx.session.userInfo?.role === "admin") {
    range.row().text(
      (ctx) => {
        const isAdmin = ctx.session.userInfo?.role === "admin" ? "✅" : "❌";

        return `admin ${isAdmin}`;
      },
      async (ctx) => {
        if (ctx.session.userInfo) {
          const userInfo = ctx.session.userInfo;
          const newRole = userInfo.role === "admin" ? "user" : "admin";

          await query.patch(`/users/${userInfo._id}`, {
            role: newRole,
          });

          ctx.session.userInfo.role = newRole;
          console.log(ctx.message?.text);

          ctx.menu.update();
        }
      }
    );
  }
});
