import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      "mongodb+srv://root:root@cluster0.juhx7wq.mongodb.net/?retryWrites=true&w=majority/offline_shop",
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
