import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import Category from './category.entity';
import { User } from './user.entity';


@Entity({name: 'product'})
export class Product extends AbstractEntity {
  @Column({type: 'varchar', length: 512, default: null, nullable: false})
  name: string;

  @Column({type: "int", default: 0, nullable: true})
  price: number;

  @Column({type: 'varchar', length: 1024, default: null, nullable: true})
  image: string;

  @ManyToOne(() => User, User => User.id)
  @JoinColumn({name: 'seller_id'})
  public seller!: User;

  @ManyToOne(() => Category, Category => Category.id)
  @JoinColumn({name: 'category_id'})
  public category!: Category;

}

export default Product;