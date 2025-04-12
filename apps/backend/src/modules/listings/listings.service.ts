/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing, ListingStatus } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createListingDto: CreateListingDto) {
    const user = await this.userRepository.findOne({
      where: { id: createListingDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newListing = this.listingRepository.create(createListingDto);

    newListing.isSold = ListingStatus.ACTIVE;
    newListing.user = user;
    const savedListing = this.listingRepository.save(newListing);
    return savedListing;
  }

  async findAll() {
    const listing = await this.listingRepository.find({
      relations: ['user'],
    });

    return listing;
  }

  async findOne(id: string) {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async findByUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const listing = await this.listingRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
    console.log(listing);

    return listing;
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    const listing = await this.findOne(id);
    if (!listing) throw new NotFoundException('Listing not found');
    const updatedListing = this.listingRepository.merge(
      listing,
      updateListingDto,
    );

    const savedListing = this.listingRepository.save(updatedListing);
    return savedListing;
  }

  async remove(id: string) {
    const listing = await this.findOne(id);
    if (!listing) throw new NotFoundException('Listing not found');
    await this.listingRepository.delete(id);
    return listing;
  }
}
