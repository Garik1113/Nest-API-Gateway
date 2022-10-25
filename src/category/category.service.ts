import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from '../entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: any) {
    const category = new Category();
    category.name = createCategoryDto.name;
    if (createCategoryDto.parent_id) {
      category.parent_id = createCategoryDto.parent_id;
    }
    await this.repository.save(category);
  }

  async getCategories(settings: any) {
    const { page = 1, limit = 100, withChilds = false } = settings;
    const categories = await this.repository
      .createQueryBuilder('category')
      .select(['category.id as id', 'category.name', 'parent_id'])
      .orderBy('category.created_at', 'DESC')
      .offset((page - 1) * limit)
      .limit(limit * page)
      .getRawMany();

    if (withChilds) {
      for (const category of categories) {
        const query = `
                    WITH RECURSIVE nodes_cte(id, name , parent_id, depth, path) AS (
                    SELECT tn.id, tn.name, tn.parent_id, 1::INT AS depth, tn.name::TEXT AS path FROM category AS tn WHERE tn.parent_id = $1
                    UNION ALL
                    SELECT c.id, c.name, c.parent_id, p.depth + 1 AS depth, (p.path || '->' || c.name::TEXT) FROM nodes_cte AS p, category AS c WHERE c.parent_id = p.id
                    )
                    SELECT * FROM nodes_cte AS n;
                `;
        const childs = await this.repository.query(query, [category.id]);
        category.childs = childs;
      }
    }

    return categories;
  }
}
