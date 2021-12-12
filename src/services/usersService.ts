import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import * as usersRepository from '../repositories/usersRepository';
import { User } from '../protocols/User';

export async function create(createUserBody: User) {
  const { name, class: classname } = createUserBody;

  const user = await usersRepository.findName(name);
  if (user) throw new Conflict('User already exists');

  const result = usersRepository.create(name, classname);
  console.log(result);
}
