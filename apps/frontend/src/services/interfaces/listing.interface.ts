import { ListingsResponse } from "../types/listing.type";

export interface ListingCardProps {
  listing: ListingsResponse;
}

export interface CreateListingInterface {
  title: string;
  description: string;
  price: number;
  category: string; //for now
  imageUrl: string[];
  contactEmail: string;
  contactPhone: string;
  userId: string;
}
