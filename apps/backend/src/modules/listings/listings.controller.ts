import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post('/create-listing')
  @ApiOperation({ summary: 'Create a new listing' })
  @ApiBody({ type: CreateListingDto })
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get('/get-listings')
  @ApiOperation({ summary: 'Get all listings' })
  findAll() {
    return this.listingsService.findAll();
  }

  @Get('/get-listing/:id')
  @ApiOperation({ summary: 'Get a listing by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Get('/get-user-listings/:userId')
  @ApiOperation({ summary: 'Get listings by user ID' })
  @ApiParam({ name: 'userId', type: String })
  findByUser(@Param('userId') userId: string) {
    return this.listingsService.findByUser(userId);
  }

  @Patch('/update-listing/:id')
  @ApiOperation({ summary: 'Update a listing by ID' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Delete('/delete-listing/:id')
  @ApiOperation({ summary: 'Delete a listing by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.listingsService.remove(id);
  }
}
