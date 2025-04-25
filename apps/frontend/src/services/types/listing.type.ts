import { UserWithoutListing } from "../interfaces/user.interface";

export type ListingsResponse = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string[];
  contactEmail: string;
  contactPhone: string;
  isSold: string;
  user: UserWithoutListing;
};
