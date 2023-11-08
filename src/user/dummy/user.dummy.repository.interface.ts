import { UserRepository } from '../domain/user.repository';

export interface UserDummyRepositoryInterface extends UserRepository {
  findDummyUsersIds: () => Promise<string[]>;
}
