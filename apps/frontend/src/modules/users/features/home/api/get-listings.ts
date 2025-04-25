import { axiosClient } from "@/lib/api/axios-instance";
import { ListingsResponse } from "@/services/types/listing.type";

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

export async function getUserListings(
  userId: string
): Promise<ListingsResponse[] | undefined> {
  const client = axiosClient();
  try {
    const { data } = await client.get(`/listings/get-user-listings/${userId}`);
    return data as ListingsResponse[];
  } catch (error) {
    console.error("Get user listing error: ", error);
  }
  return undefined;
}
