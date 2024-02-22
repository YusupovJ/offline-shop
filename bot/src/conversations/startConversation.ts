import { Keyboard } from "grammy";
import { MyContext, MyConversation } from "../types";
import axios from "axios";

export async function startConversation(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Hello. Welcome to offline shop! Please sign up!");

  await ctx.reply("Your first name:");
  const firstName = (await conversation.waitFor(":text")).message?.text;

  await ctx.reply("Your last name:");
  const lastName = (await conversation.waitFor(":text")).message?.text;

  await ctx.reply("Share your phone number:", {
    reply_markup: new Keyboard().requestContact("☎️ Share Contact").oneTime().resized(),
  });
  const phoneNumber = (await conversation.waitFor(":contact")).message?.contact.phone_number;

  const userInfo = {
    firstName,
    lastName,
    phoneNumber,
    tgId: ctx.from?.id,
  };

  try {
    const response = await axios.request({
      url: "http://localhost:3000/users",
      method: "POST",
      data: userInfo,
    });

    console.log(response.data);

    await ctx.reply("Congratulations 🎉! You successfully signed up!", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
