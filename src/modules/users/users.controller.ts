import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '@/entities';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId') findById(
    @Param('userId') userId: number,
  ): Promise<Users | null> {
    return this.usersService.findById(userId);
  }

  @Get('/login/:phone')
  login(@Param('phone') phone: string): Promise<Users> {
    return this.usersService.login(phone);
  }
}
