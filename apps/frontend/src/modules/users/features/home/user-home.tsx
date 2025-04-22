import { ListingCard } from "@/components/listing/listing-card";
import { Sidebar } from "@/components/sidebar/sidebar";
//import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getListings, ListingsResponse } from "./api/get-listings";
import { useEffect, useState } from "react";

export function UserHome() {
  const [listings, setListings] = useState<ListingsResponse[]>([]);
  // const handleListings = async () => {
  //   const response = await getListings();
  //   console.log("These are the listings: ", response);
  // };
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListings();
        const editedResponse = response as ListingsResponse[];
        setListings(editedResponse);
      } catch (error) {
        console.error("This is an error from the home page", error);
      }
    };
    fetchListings();
  });
  return (
    <div className="bg-white h-screen">
      <h1 className="font-bold text-[48px] my-2 mx-8">WELCOME Michael!!!</h1>
      <div className="flex w-full justify-center">
        <Tabs defaultValue="all-listings" className="">
          <TabsList className="w-[616px]">
            <TabsTrigger value="all-listings">All listings</TabsTrigger>
            <TabsTrigger value="my-listings">My listings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex gap-20">
        <div className="mx-20">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          {/* List, Pagination and add new button */}
          <div>{/* <Button onClick={handleListings}>Test</Button> */}</div>
          <div className="grid grid-cols-3 gap-6 justify-center space-y-8 mt-5 overflow-y-auto">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
