import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext } from "react";
import { FiUserPlus } from "react-icons/fi";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { TbHelpCircle } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AuthProviderContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const UserInfo = () =>  {
  const {currentUser, signOutUser, loading} = useContext(AuthProviderContext);
  const navigate = useNavigate()


  const handleSignOutUser = () => {
    signOutUser().then(() => {
      toast.success("Sign out Successfull")
      navigate("/login-page")
    }).catch(error => {
      console.log(error)
      toast.error("An error happend")
    })
  }
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center ">
          <div className="w-9 h-9 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={currentUser?.photoURL}
              className="w-full rounded-full ring-2 ring-offset-2 ring-black/70 h-full"
            />
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="mt-5 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <div className="p-4 bg-white shadow-lg rounded-2xl w-full">
              <div className="flex flex-row items-start gap-4">
                <img
                  src={currentUser?.photoURL}
                  className="rounded-lg w-28 h-28"
                />
                <div className="flex flex-col justify-between w-full h-28">
                  <div>
                    <p className="text-xl font-medium text-gray-800 dark:text-white">
                      {currentUser?.displayName}
                    </p>
                    <p className="text-xs text-gray-400">FullStack dev</p>
                  </div>
                  <div className="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-black gap-3">
                      <p className="flex flex-col">
                        Articles
                        <span className="font-bold text-black dark:text-indigo-500">
                          34
                        </span>
                      </p>
                      <p className="flex flex-col">
                        Followers
                        <span className="font-bold text-black dark:text-indigo-500">
                          455
                        </span>
                      </p>
                      <p className="flex flex-col">
                        Rating
                        <span className="font-bold text-black dark:text-indigo-500">
                          9.3
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 mt-6">
                <button
                  type="button"
                  className="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-black font-medium hover:bg-gray-200 "
                >
                  History
                </button>
                <button
                  type="button"
                  className="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
                >
                  Dashboard
                </button>
              </div>

              {/* More details  */}
            <div className="mt-4">
                <Link to={'/'} className="flex items-center px-3 py-3 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                    <LuUser2 size={20}/>
                    <span className="mx-1">
                        view profile
                    </span>
                </Link>
                <Link to={'/'} className="flex items-center px-3 py-3 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                    <IoSettingsOutline size={20}/>
                    <span className="mx-1">
                        Setting
                    </span>
                </Link>
                <Link to={'/'} className="flex items-center px-3 py-3 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                    <FiUserPlus size={20}/>
                    <span className="mx-1">
                        Invited
                    </span>
                </Link>
                <div className="divider my-0"></div>
                <Link to={'/'} className="flex items-center px-3 py-3 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                    <TbHelpCircle size={20}/>
                    <span className="mx-1">
                        Help
                    </span>
                </Link>
                <button onClick={handleSignOutUser} className="flex items-center px-3 py-3 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                    <IoExitOutline size={20}/>
                    <span className="mx-1">
                        Sign Out
                    </span>
                </button>
            </div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default UserInfo;

// return {

// <div className="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
// <div className="flex flex-row items-start gap-4">
//     <img src="/images/person/1.jpg" className="rounded-lg w-28 h-28"/>
//     <div className="flex flex-col justify-between w-full h-28">
//         <div>
//             <p className="text-xl font-medium text-gray-800 dark:text-white">
//                 John Jackson
//             </p>
//             <p className="text-xs text-gray-400">
//                 FullStack dev
//             </p>
//         </div>
//         <div className="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
//             <div className="flex items-center justify-between text-xs text-gray-400 dark:text-black">
//                 <p className="flex flex-col">
//                     Articles
//                     <span className="font-bold text-black dark:text-indigo-500">
//                         34
//                     </span>
//                 </p>
//                 <p className="flex flex-col">
//                     Followers
//                     <span className="font-bold text-black dark:text-indigo-500">
//                         455
//                     </span>
//                 </p>
//                 <p className="flex flex-col">
//                     Rating
//                     <span className="font-bold text-black dark:text-indigo-500">
//                         9.3
//                     </span>
//                 </p>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="flex items-center justify-between gap-4 mt-6">
//     <button type="button" className="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 ">
//         Chat
//     </button>
//     <button type="button" className="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 ">
//         Add friend
//     </button>
// </div>
// </div>

// }
