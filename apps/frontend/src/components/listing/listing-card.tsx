import User2 from "@/assets/png/user-2.png";
import { ListingCardProps } from "@/services/interfaces/listing.interface";

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return (
    <div className="h-[29rem] w-[18rem] mb-10">
      {/* Profile pic and username */}
      {/* Product image */}
      {/* Product name and price */}

      <div className="flex flex-col justify-between gap-2">
        <div className="flex justify-start items-center ml-4 gap-2">
          <img src={User2} alt="user 2" />
          <h1 className="text-black font-bold">{listing.user.firstName}</h1>
        </div>
        <div className="h-[24rem] w-[18rem]">
          <img
            src={`${baseURL}${listing.imageUrl}`}
            alt={`${listing.title}`}
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-between mx-3 text-black">
          <h1 className="font-bold">{listing.title}</h1>
          <h3>{`$${listing.price}`}</h3>
        </div>
      </div>
    </div>
  );
};
