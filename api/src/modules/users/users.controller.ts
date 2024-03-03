import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserQuery } from "./dto/get-user.query";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createProductDto: CreateUserDto) {
    return await this.userService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: GetUserQuery) {
    return await this.userService.findAll(query);
  }

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return await this.userService.findById(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateProductDto: UpdateUserDto) {
    return await this.userService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
