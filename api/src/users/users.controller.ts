import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createProductDto: CreateUserDto) {
    return await this.userService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: GetUserDto) {
    const phoneNumber = query.phoneNumber && `+${query.phoneNumber.slice(1)}`;
    return await this.userService.findAll(phoneNumber);
  }

  @Get("/:id")
  async findOne(@Param("id") tgId: string) {
    return await this.userService.findOne(parseInt(tgId));
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
