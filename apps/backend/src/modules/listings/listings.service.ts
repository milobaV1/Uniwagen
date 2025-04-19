/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing, ListingStatus } from './entities/listing.entity';
import { Brackets, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FilterListingDto } from './dto/filter-listing.dto';

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
      // select: {
      //   firstName: true,
      //   lastName: true,
      //   email: true,
      //   phone: true
      // }
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
  async filter2(filterListingDto: FilterListingDto) {
    const { title, description, price, category } = filterListingDto;
    const conditions: FindOptionsWhere<Listing> | FindOptionsWhere<Listing>[] =
      {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(price ? { price } : {}),
        ...(category ? { category } : {}),
      };

    return await this.listingRepository.find({
      where: conditions,
    });
  }
  async filter(filterListingDto: FilterListingDto) {
    const { title, description, price, category, search } = filterListingDto;
    const queryBuilder = this.listingRepository.createQueryBuilder('listing');
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(listing.title) LIKE LOWER(:search)', {
            search: `%${search}%`,
          })
            .orWhere('LOWER(listing.description) LIKE LOWER(:search)', {
              search: `%${search}%`,
            })
            .orWhere('CAST(listing.price AS TEXT) LIKE :search', {
              search: `%${search}%`,
            })
            .orWhere(
              'LOWER(CAST(listing.category AS TEXT)) LIKE LOWER(:search)',
              {
                search: `%${search}%`,
              },
            );
        }),
      );
    }

    if (title) {
      queryBuilder.andWhere('listing.title = :title', { title });
    }
    if (description) {
      queryBuilder.andWhere('listing.description = :description', {
        description,
      });
    }
    if (price) {
      queryBuilder.andWhere('listing.price = :price', { price });
    }
    if (category) {
      queryBuilder.andWhere('listing.category = :category', { category });
    }

    return queryBuilder.getMany();
  }
}
