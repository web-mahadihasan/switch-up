import { Button } from "@material-tailwind/react";
import { Outlet, useLocation } from "react-router-dom";

const LoginPage = () => {
  const {pathname} = useLocation()
  return (
    <div className={`container mx-auto px-4 bg-loginBg bg-center bg-no-repeat `}>
      <div className="min-h-[calc(100vh-200px)] grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className=" h-full content-center col-span-2">
            <h3 className="text-5xl my-6 font-bold leading-tight">{pathname == "/login-page/signup"? <p>Create account for stay connect <br /> to our Community</p> :<p>Welcome back to our <br /> Community</p>}</h3>
            <p className="font-medium">Start your new journey with us and join our community </p>
            <Button ripple={true} className="mt-16 font-semibold text-sm">Explore our community </Button>
        </div>
        <div className=" h-full content-center">
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

