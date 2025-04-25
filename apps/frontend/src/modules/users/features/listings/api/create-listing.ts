import { axiosClient } from "@/lib/api/axios-instance";
import { CreateListingInterface } from "@/services/interfaces/listing.interface";
import { ListingsResponse } from "@/services/types/listing.type";

export async function createListing(
  listing: CreateListingInterface
): Promise<ListingsResponse | undefined> {
  const client = axiosClient();
  try {
    const { data, status } = await client.post(
      `/listings/create-listing`,
      listing
    );
    if (![200, 201, 202].includes(status)) throw new Error(data.message);
    return data as ListingsResponse;
  } catch (error) {
    console.error("Create listing error: ", error);
  }
}
