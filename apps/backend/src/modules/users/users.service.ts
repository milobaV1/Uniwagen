/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findOne('email', createUserDto.email);

    if (existingUser) throw new BadRequestException(`User already exists`);
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    await this.mailService.sendMail({
      from: process.env.MAIL_FROM,
      to: savedUser.email,
      subject: 'Welcome to our platform',
      text: `Hello ${savedUser.firstName}, welcome to our platform!`,
    });
    return instanceToPlain(savedUser);
  }

  async findAll() {
    const user = await this.userRepository.find({
      relations: ['listings'],
    });
    return instanceToPlain(user);
  }

  async findOne(searchParam: 'email' | 'id', searchValue: string) {
    const user = await this.userRepository.findOne({
      where: { [searchParam]: searchValue },
    });
    //return instanceToPlain(user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne('id', id);
    if (!user) throw new BadRequestException('User not found');

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    const savedUser = await this.userRepository.save(updatedUser);

    return instanceToPlain(savedUser);
  }

  async remove(id: string) {
    const user = await this.findOne('id', id);
    if (!user) throw new BadRequestException('User not found');
    await this.userRepository.delete(id);
    return instanceToPlain(user);
  }
}
