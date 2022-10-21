import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/user.guard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authMicroservice: ClientProxy,
  ) {}

  @Post('/create')
  async create(@Body() data: CreateUserDto) {
    const result = await firstValueFrom(
      this.authMicroservice.send('create_user', data),
    );

    return result;
  }

  @Post('login')
  async login(@Body() data: any) {
    const result = await firstValueFrom(
      this.authMicroservice.send('login_with_credintails', data),
    );
    return {
      access_token: result.access_token,
    };
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async update(@Body() data: UpdateUserDto, @Request() request: any) {
    const result = await firstValueFrom(
      this.authMicroservice.send('update_user', {
        roles: data.roles,
        id: request.user.id,
      }),
    );
    return {
      message: 'UPDATED',
    };
  }
}
