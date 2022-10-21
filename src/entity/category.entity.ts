import { Entity, Column, Unique, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';


@Entity({name: 'category'})
@Unique(['name', , 'parent'])
export class Category extends AbstractEntity {
  @Index()
  @Column({type: 'varchar', length: 200, nullable: true, default: null})
  name:string;

  @Column({nullable: true})
  parent_id: string;

  @Index()
  @ManyToOne(() => Category, Category => Category.id)
  @JoinColumn({name: 'parent_id'})
  public parent!: Category;

}

export default Category;