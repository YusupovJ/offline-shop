import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { GetUserQuery } from "./dto/get-user.query";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });

    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(query?: GetUserQuery) {
    const phoneNumber = query.phoneNumber || "";

    const allUsers = await this.userModel.find({
      ...query,
      phoneNumber: { $regex: ".*" + phoneNumber + ".*" },
    });

    return allUsers;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return updated;
  }

  async remove(id: string) {
    const removed = await this.userModel.findByIdAndDelete(id);
    return removed;
  }
}
