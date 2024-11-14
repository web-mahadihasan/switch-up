import { Button, Checkbox, Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthProviderContext } from "../provider/AuthProvider";
import { Result } from "postcss";
import toast from "react-hot-toast";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false)
    const navigate = useNavigate()

    const {loginUser, loading} = useContext(AuthProviderContext)

    const handleLoginEmail = (e) => {
        const inputEmail = e.target.value
        setLoginEmail(inputEmail)
    }
    const handleLoginPassword = (e) => {
        const inputPassword = e.target.value
        setLoginPassword(inputPassword)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(loginEmail, loginPassword)
        .then((result) => {
            if(result.user.emailVerified){
                setInvalidLogin(false)
                toast.success("log in success")
                navigate("/")
            }else{
                toast.error("Please verify your email first")
            }
        }).catch(error => {
            if(error.message = "auth/invalid-credentia"){
                setInvalidLogin(true)
            }
            // console.log(error)
        })
    }
    return (
        <div className="text-center px-10">
            <h1 className="my-10 text-4xl font-extrabold text-[#E32D2D]">LOGIN</h1>
            <div>
                {
                    invalidLogin && <p className="mb-2 text-left text-red-500">Your email or password was invalid.</p>
                }
                <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <Input onChange={handleLoginEmail} value={loginEmail} type="email" required inputMode="text"
                    label="Enter your email"
                    className={`${invalidLogin && "border-red-500"} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4`} /></div>
                <div className="relative">
                    <Input onChange={handleLoginPassword} value={loginPassword} type={showPassword? "text" : "password"} inputMode="text"
                    label="Enter your password" required
                    className={`${invalidLogin && "border-red-500"} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4`} />
                    <div onClick={()=> setShowPassword(!showPassword)} className="absolute top-2 right-2">
                        {showPassword? <IoEyeOffOutline size={20} /> : <FaRegEye size={20}/>}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Checkbox label="Remember Me" />
                    <Link to={"/login-page/forgot-password"} className="hover:text-blue-500 duration-300">Forgot password?</Link>
                </div>
                <Button fullWidth type="submit" className="text-sm font-semibold tracking-wider">Log in</Button>
                </form>
            </div>
            <p className="font-medium text-black/70 my-5">Don't have an account? <Link to={"/login-page/signup"} className="underline text-blue-500 hover:text-black/70 duration-300">Sign up here</Link></p>
            <div className="divider">Or Connect with</div>
            <div className="space-x-6 my-10">
                <button className="border p-3 bg-[#FDF5F5] shadow-lg border-gray-200"><FcGoogle size={22} /></button>
                <button className="border p-3 bg-[#FDF5F5] shadow-lg border-gray-200"><FaFacebook size={22} className="text-blue-700"/></button>
                <button className="border p-3 bg-[#FDF5F5] shadow-lg border-gray-200"><BsTwitterX size={22} /></button>
            </div>
        </div>
    );
};

export default Login;