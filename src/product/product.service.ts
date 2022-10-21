import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from '../entity/product.entity';
  

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly repository: Repository<Product>) { }

    async createProduct(data: any, sellerId) {
        const { name, image, categoryId, price } = data;
        await this.repository.createQueryBuilder()
            .insert()
            .into(Product)
            .values({ 
                name, 
                image, 
                price, 
                seller: 
                sellerId, 
                category: categoryId 
            })
            .execute();
    }

    async getProducts(settings: any) {
        const { page = 1, limit = 100 } = settings;
        const products = await this.repository
            .createQueryBuilder('product')
            .leftJoin('users', 'user', 'user.id = product.seller_id')
            .leftJoin('category', 'category', 'category.id = product.category_id')
            .select([
                "product.id",
                "product.name",
                "image",
                `user.id as seller_id`,
                `category.id as category_id`,
                `category.name as category_name`,
            ])
            .orderBy("product.created_at", "DESC")
            .offset((page - 1) * limit)
            .limit(limit * page)
            .getRawMany();

        return products
    }
}
