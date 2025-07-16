import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.services';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('/register')
  // async create(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // async findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }
}
