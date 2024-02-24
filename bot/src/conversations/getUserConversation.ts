import query from "../config/axios.config";
import { sendUserInfo } from "../helpers/sendUserInfo";
import { MyConversation, MyContext, IUser } from "../types";

export async function getUserConversation(conversation: MyConversation, ctx: MyContext) {
  // await ctx.reply("Please send id of the user:");
  // const id = (await conversation.waitFor(":text")).message?.text;
  // const { data: userInfo } = await query.get<IUser[]>(`/users/id/${id}`);
  // if (!userInfo[0]) {
  //   await ctx.reply("User does not exist");
  //   return;
  // }
  // await sendUserInfo(ctx, userInfo[0]);
}
