import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UserMap from '../../../../../mappers/UsersMap';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // delete user.password;
    const mappedUser = UserMap.toDTO(user);

    // return response.json({ user, token });
    return response.json({ mappedUser, token });
  }
}

// Controller = index, show, create, update, delete
