import { axiosClient } from "@/lib/api/axios-instance";
import { ListingsResponse } from "@/services/types/listing.type";

export async function getOneListing(
  listingId: string
): Promise<ListingsResponse | undefined> {
  const client = axiosClient();
  try {
    const response = await client.get(`/listings/get-listing/${listingId}`);
    console.log(`Listing with this id:${listingId}`, response.data);
    return response.data as ListingsResponse;
  } catch (error) {
    console.error("Get one listing error: ", error);
  }
  return undefined;
}
