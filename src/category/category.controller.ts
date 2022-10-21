import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/user.guard';
import { RoleGuard } from '../users/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @Roles('seller')
  @UseGuards(AuthGuard, RoleGuard)
  create(@Body() createCategoryDto: any) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('/get')
  get(@Body() createCategoryDto: any) {
    return this.categoryService.getCategories(createCategoryDto);
  }
}
