import { axiosClient } from "@/lib/api/axios-instance";
import { User } from "../interface";

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
  user: User;
};

export async function getListings(): Promise<ListingsResponse[] | undefined> {
  const client = axiosClient();
  try {
    const response = await client.get(`/listings/get-listings`);
    console.log("All listings: ", response.data);
    return response.data as ListingsResponse[];
  } catch (error) {
    console.error("Get listing error", error);
  }
  return undefined;
}
