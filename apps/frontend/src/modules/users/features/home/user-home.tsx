import { ListingCard } from "@/components/listing/listing-card";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserHome() {
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
          <div></div>
          <div className="grid grid-cols-3 gap-6 justify-center space-y-8 mt-5 overflow-y-auto">
            {Array.from({ length: 9 }, (_, index) => (
              <ListingCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
