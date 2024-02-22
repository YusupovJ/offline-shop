import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import envConfig from "src/config/env.config";
import { ProductsModule } from "src/users/users.module";

@Module({
  imports: [MongooseModule.forRoot(envConfig.DB_URL), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
