import { Button } from "@/components/ui/button";
import { Route } from "@/routes/(user)/_authenticated/(home)/_layout/listing/$id";
import { useEffect, useState } from "react";
import { getOneListing } from "./api/get-one-listing";
import { ListingsResponse } from "@/services/types/listing.type";

export function ListingPreview() {
  const { id } = Route.useParams();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [listing, setListing] = useState<ListingsResponse>();
  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await getOneListing(id);
        const editedResponse = response as ListingsResponse;
        setListing(editedResponse);
      } catch (error) {
        console.error("Error from the Listing Preview page: ", error);
      }
    };
    getListing();
  });
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center h-full">
        <div className="w-[75rem] h-[31rem] bg-white p-3 m-8 border rounded-xl shadow-lg">
          <div className="flex justify-between items-center w-full h-full m-3 gap-3">
            <div className="w-[30rem] h-[26rem]">
              <img
                src={`${baseURL}${listing?.imageUrl}`}
                alt={`${listing?.title}`}
                className="w-full h-full"
              />
            </div>
            <div className="h-[26rem] w-[40rem] flex flex-col justify-between p-4">
              <div className="flex flex-col justify-between items-end h-[12rem] pr-10">
                <h1 className="text-[30px] font-bold">{listing?.title}</h1>
                <h1 className="text-[20px]">{`$${listing?.price}`}</h1>
                <h1 className="text-[15px]">{`Sold by: ${listing?.user.firstName.toUpperCase()}`}</h1>
                <Button>BUY NOW</Button>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-[20px] font-bold">DESCRIPTION</h1>
                <h1>{listing?.description}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
