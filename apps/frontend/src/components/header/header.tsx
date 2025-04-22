import { Search } from "../search/search";
import Profile from "@/assets/png/default-user.png";

export function Header() {
  return (
    <div className="w-full h-[65px] bg-[#100F57] fixed top-0">
      <div className="flex justify-between items-center h-full px-20">
        <h1 className="text-white font-bold text-[30px]">PAUWAGEN</h1>
        <Search />
        <img src={Profile} alt="profile" />
      </div>
    </div>
  );
}
