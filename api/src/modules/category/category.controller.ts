import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoryQuery } from "./dto/get-category.query";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() query: GetCategoryQuery) {
    const { categories, pagination } = await this.categoryService.findAll(query);

    return { categories, pagination };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.categoryService.remove(id);
  }
}
