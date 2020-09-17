import User from '@modules/users/infra/typeorm/entities/Users';

export default class UserMap {
  public static toDTO(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created: user.created,
      updated: user.updated,
    };
  }
}
