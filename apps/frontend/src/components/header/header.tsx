import { useAuthState } from "@/stores/auth.store";
import { Search } from "../search/search";
import Profile from "@/assets/png/default-user.png";

export function Header() {
  const { user } = useAuthState();
  console.log(user);
  return (
    <div className="w-full h-[65px] bg-[#100F57] fixed top-0">
      <div className="flex justify-between items-center h-full px-20">
        <h1 className="text-white font-bold text-[30px]">PAUWAGEN</h1>
        <Search />
        <div className="flex items-center gap-2">
          <img src={Profile} alt="profile" />
          <h1 className="text-white font-bold text-[20px]">{`${user?.firstName}`}</h1>
        </div>
      </div>
    </div>
  );
}
