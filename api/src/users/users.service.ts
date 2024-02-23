import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";

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

  async findAll() {
    const allUsers = await this.userModel.find().exec();

    return allUsers;
  }

  async findOne(tgId: number) {
    const user = await this.userModel.findOne({ tgId }).exec();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updated = await this.userModel.updateOne({ _id: id }, updateUserDto);

    return updated;
  }

  remove(id: string) {
    return `This action removes a ${id} user`;
  }
}
