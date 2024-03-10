import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schemas/category.schema";
import { Model } from "mongoose";
import { GetCategoryQuery } from "./dto/get-category.query";
import { Pagination } from "src/helpers/pagination";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);

    await newCategory.save();

    return newCategory;
  }

  async findAll(query: GetCategoryQuery) {
    const total = await this.categoryModel.countDocuments();
    const pagination = new Pagination(total, query.page, query.limit);

    const categories = await this.categoryModel.find().limit(pagination.limit).skip(pagination.offset);

    return { categories, pagination };
  }

  async remove(id: string) {
    console.log(id);

    return await this.categoryModel.deleteOne({ _id: id });
  }
}
