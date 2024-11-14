import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { AuthProviderContext } from "../provider/AuthProvider";
import UserInfo from "./UserInfo";
 
const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const {currentUser} = useContext(AuthProviderContext)
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"} className="p-1 font-normal" > Home </Link>
      <Link className="p-1 font-normal" > Products </Link>
      <Link className="p-1 font-normal" > About </Link>
      <Link to={"/orders"} className="p-1 font-normal" > Order </Link>
      {
        currentUser && <Link to={'/my-profile'} className="p-1 font-normal" > My Profile </Link>
      }
    </ul>
  );
 
  return (
    <div className="sticky top-0 max-h-[768px] w-full flex items-center z-50 backdrop-blur-2xl bg-white/30">
      <Navbar className=" z-10 h-max max-w-full rounded-none">
        <div className="flex items-center justify-between text-blue-gray-900 container mx-auto px-4">
          <Link className="mr-4 cursor-pointer py-1.5 font-bold text-3xl" >
            SwithUP
          </Link>
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-4">
            
            <div className="flex">
              {
                currentUser? 
                <UserInfo/> : 
                (<div className="flex items-center gap-x-1">
                  <Link to={"/login-page"} className="border border-gray-200 rounded-lg mr-4">
                    <Button variant="text" size="sm" color="blue-gray">
                      Log In
                    </Button>
                  </Link>
                  <Link to={"/login-page/signup"}>
                    <Button variant="gradient" size="sm"> Sign In </Button>
                  </Link>
                </div>)
              }

            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 align-middle w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 align-middle"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            {/* icon  */}
          </div>
        </div>
        <div className={openNav ? "block duration-500 text-black": "hidden duration-500"} >
            {navList}
            <div className="flex items-center gap-x-1">
              <Link to={"/login-page"} className="px-8 font-medium mr-3 py-1 border border-gray-200 rounded-lg hover:bg-black/5 focus:bg-black/5">
                <span>Log In</span>
              </Link>
              <Link className="px-8 py-1 border border-black bg-black text-white font-medium rounded-lg">
                <span>Sign in</span>
              </Link>
            </div>
          
        </div>
      </Navbar>
    </div>
  );
}

export default Header;


