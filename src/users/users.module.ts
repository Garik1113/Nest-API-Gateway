import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_MICROSERVICE_HOST,
          port: Number(process.env.AUTH_MICROSERVICE_PORT),
        },
      },
      {
        name: 'MAILER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MAIL_MICROSERVICE_HOST,
          port: Number(process.env.MAIL_MICROSERVICE_PORT),
        },
      },
    ]),
  ],
  providers: [],
  controllers: [UsersController],
})
export class UsersModule {}
