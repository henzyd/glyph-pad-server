import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(usersDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(usersDto);
    return this.usersRepository.save(user);
  }

  findOne(ip: string) {
    return this.usersRepository.findOneBy({ ip });
  }

  async findOrCreateUser(userIp: string) {
    let user = await this.findOne(userIp);

    if (!user) {
      user = await this.create({ ip: userIp });
    }

    return user;
  }
}
