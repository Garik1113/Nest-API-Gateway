import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { RoleGuard } from './product.guard';
import { ProductService } from './product.service';
import { Roles } from '../users/decorators/roles.decorator';
import { AuthGuard } from '../users/guards/user.guard';
import { RoleGuard } from '../users/guards/roles.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  @Roles('seller')
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() productData: any, @Request() request: any) {
    await this.productService.createProduct(productData, request.user.id);
  }

  @Get('get')
  async getProducts(@Body() settings: any) {
    return this.productService.getProducts(settings);
  }
}
