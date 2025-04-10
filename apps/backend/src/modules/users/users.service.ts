/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findOne(
      'email',
      createUserDto.email,
    );

    if(existingUser) throw new BadRequestException(`Student already exists`);
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    const { password, ...rest } = savedUser;
    return rest;
    
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(searchParam: 'email' | 'id', searchValue: string) {
    return await this.userRepository.findOne({
      where: { [searchParam]: searchValue },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
