import { Users } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  findById(userId: number): Promise<Users | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async login(phone: string): Promise<Users> {
    if (!phone) throw Error('phone is empty');
    const user: Users | null = await this.userRepository.findOneBy({ phone });

    if (user) return user;

    const newUser: Users = await this.userRepository.save({ phone });
    return newUser;
  }
}
