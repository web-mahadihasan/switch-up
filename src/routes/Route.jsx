import {
    createBrowserRouter,
  } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Orders from "../pages/Orders";
import MyProfile from "../pages/MyProfile";
import Loader from "../components/Loader";


  const Route = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login-page",
            element: <LoginPage/>,
            children: [
                {
                    path: "/login-page",
                    element: <Login/>
                },
                {
                    path: "/login-page/login",
                    element: <Login/>
                },
                {
                    path: "/login-page/signup",
                    element: <Signup/>
                },
                {
                    path: "/login-page/forgot-password",
                    element: <ForgotPassword/>
                },
                {
                    path: "/login-page/loading",
                    element: <Loader/>
                }
            ]
        },
        {
          path: "/orders",
          element: <PrivateRoute><Orders/> </PrivateRoute>
        },
        {
          path: "/my-profile",
          element: <PrivateRoute><MyProfile/> </PrivateRoute>
        }
      ]
    },
  ]);


  export default Route;