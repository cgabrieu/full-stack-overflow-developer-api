import jwt from 'jsonwebtoken';
import Conflict from '../errors/Conflict';
import NotFound from '../errors/NotFound';
import * as usersRepository from '../repositories/usersRepository';
import { User } from '../protocols/User';
import Invalid from '../errors/Invalid';

export async function create(createUserBody: User): Promise<string> {
  const { name, class: classname } = createUserBody;

  const user = await usersRepository.findName(name);
  if (user) throw new Conflict('User already exists');

  const userId = await usersRepository.create(name, classname);
  if (userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token;
  }
  throw new Invalid('Invalid data, unable to create user');
}
