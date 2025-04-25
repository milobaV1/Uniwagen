import { ListingCard } from "@/components/listing/listing-card";
//import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getListings, getUserListings } from "./api/get-listings";
import { useEffect, useState } from "react";
import { ListingsResponse } from "@/services/types/listing.type";
import { useAuthState } from "@/stores/auth.store";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AddListing } from "../listings/add-listing";

export function UserHome() {
  const [listings, setListings] = useState<ListingsResponse[]>([]);
  const [userlistings, setUserListings] = useState<ListingsResponse[]>([]);
  const [add, setAdd] = useState(false);
  // const [activeTab, setActiveTab] = useState(0);
  // const handleListings = async () => {
  //   const response = await getListings();
  //   console.log("These are the listings: ", response);
  // };
  const { user } = useAuthState();
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
  }, []);
  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        if (user?.id) {
          const response = await getUserListings(user.id);
          const editedResponse = response as ListingsResponse[];
          setUserListings(editedResponse);
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        console.error(
          "This is an error from the home page while getting user listings: ",
          error
        );
      }
    };
    fetchMyListings();
  }, [user?.id]);
  const showAdd = () => {
    setAdd(true);
  };
  return (
    <div className="bg-white h-full">
      <div className="flex w-full justify-center items-center">
        <Tabs defaultValue="all-listings" className="">
          <div className="flex w-full justify-center my-10">
            <TabsList className="w-[616px]">
              <TabsTrigger value="all-listings">All listings</TabsTrigger>
              <TabsTrigger value="my-listings">My listings</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all-listings">
            <div className="flex flex-col w-full">
              {/* List, Pagination and add new button */}
              <div>{/* <Button onClick={handleListings}>Test</Button> */}</div>
              <div className="grid grid-cols-4 gap-6 justify-center space-y-8 mt-5 overflow-y-auto">
                {listings.length > 0 ? (
                  listings.map((listing) => (
                    <Link to="/listing/$id" params={{ id: listing.id }}>
                      <ListingCard key={listing.id} listing={listing} />
                    </Link>
                  ))
                ) : (
                  <h1>There are no listings</h1>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="my-listings">
            <div className="flex">
              <div className="flex flex-col w-full">
                {/* List, Pagination and add new button */}
                <div className="flex justify-end">
                  <Button onClick={showAdd}>Add new</Button>
                </div>
                <div className="grid grid-cols-4 gap-6 justify-center space-y-8 mt-5 overflow-y-auto">
                  {userlistings.length > 0 ? (
                    userlistings.map((listing) => (
                      <Link to="/listing/$id" params={{ id: listing.id }}>
                        <ListingCard key={listing.id} listing={listing} />
                      </Link>
                    ))
                  ) : (
                    <h1>You have no listings</h1>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        {add && <AddListing setAdd={setAdd} />}
      </div>
    </div>
  );
}
