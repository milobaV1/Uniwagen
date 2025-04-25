import { ListingsResponse } from "../types/listing.type";

export interface User {
  id: string;
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  profileImage: string;
  listings: ListingsResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutListing {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
}
