import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function LandingHome() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate({ to: "/sign-up" });
  };

  const handleLogin = () => {
    navigate({ to: "/login" });
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#6664E5] via-[#3432AC] via-[#100F57] to-[#0D0C4C]">
      <div className="flex justify-center items-center h-full">
        <div className="h-[44rem] px-8">
          <div className="flex flex-col justify-center items-center h-full gap-20">
            <div className="flex flex-col items-center">
              <h1 className="text-white font-bold text-[50px]">PAUWAGEN</h1>
              <h3 className="text-white text-[15px]">
                Connect, list and sell items easily!
              </h3>
            </div>
            <div className="flex w-full justify-between gap-5">
              <Button
                className="w-[22rem] h-[3rem] text-[#110000] bg-white"
                onClick={handleSignUp}
              >
                Sign up
              </Button>
              <Button
                className="w-[22rem] h-[3rem] text-[#ffffff] bg-[100F57]"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
