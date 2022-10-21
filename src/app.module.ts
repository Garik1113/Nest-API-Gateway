import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerOptions } from 'typeorm';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    CategoryModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        logging: process.env.DB_LOGGING as LoggerOptions,
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [process.env.DB_ENTITY_PATH],
        synchronize: process.env.DB_SYNCHRONIZE == 'true',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
