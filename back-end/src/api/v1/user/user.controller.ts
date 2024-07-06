import { Get, JsonController, Param, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import auth from '@middlewares/auth.middleware';
import { IUser } from '@models/users.model';
import { UserService } from '@services/v1';

@JsonController('/v1/users', { transformResponse: false })
export class UserController {
  private readonly userService = new UserService();

  @Get('/')
  @OpenAPI({ summary: 'get users' })
  @ResponseSchema(IUser, { isArray: true })
  @UseBefore(auth())
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'get user by id' })
  @ResponseSchema(IUser)
  @UseBefore(auth())
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return { user };
  }
}
