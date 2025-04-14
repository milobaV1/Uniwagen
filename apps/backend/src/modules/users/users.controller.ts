/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get-users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Successfully fetched all users.' })
  @ApiResponse({ status: 404, description: 'No users found.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('get-user/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully fetched the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne('id', id);
  }

  @Get('find-by-email')
  @ApiOperation({ summary: 'Find a user by email' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the user by email.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with provided email.',
  })
  async findUser(@Query('email') email?: string) {
    if (email) {
      return this.usersService.findOne('email', email);
    }
    return null;
  }

  @Patch('update-user/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete-user/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
