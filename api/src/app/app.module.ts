import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import envConfig from "src/config/env.config";
import { UsersModule } from "src/users/users.module";
import { CategoryModule } from "src/category/category.module";

@Module({
  imports: [MongooseModule.forRoot(envConfig.DB_URL), UsersModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
