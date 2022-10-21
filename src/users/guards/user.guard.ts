import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) return false;

    const user = await firstValueFrom(
      this.userServiceClient.send('get_user_roles', {
        access_token: request.headers.authorization.split(' ')[1],
      }),
    );

    if (!user) return false;

    request.user = user;
    return true;
  }
}
