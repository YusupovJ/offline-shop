import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import envConfig from "src/config/env.config";
import { UsersModule } from "src/modules/users/users.module";
import { CategoryModule } from "src/modules/category/category.module";

@Module({
  imports: [MongooseModule.forRoot(envConfig.DB_URL), UsersModule, CategoryModule],
})
export class AppModule {}
