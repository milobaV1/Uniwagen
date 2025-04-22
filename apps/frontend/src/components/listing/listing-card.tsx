import User2 from "@/assets/png/user-2.png";
export const ListingCard = () => {
  return (
    <div className="h-[29rem] w-[18rem]">
      {/* Profile pic and username */}
      {/* Product image */}
      {/* Product name and price */}
      <div className="flex flex-col justify-between gap-2">
        <div className="flex justify-start items-center ml-4 gap-2">
          <img src={User2} alt="user 2" />
          <h1 className="text-black font-bold">Username</h1>
        </div>
        <div className="h-[24rem] w-[18rem] bg-[#100F57]"></div>
        <div className="flex justify-between mx-3 text-black">
          <h1 className="font-bold">Product Name</h1>
          <h3>$Price</h3>
        </div>
      </div>
    </div>
  );
};
