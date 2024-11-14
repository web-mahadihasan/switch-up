import { Button, Input } from "@material-tailwind/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthProviderContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const ForgotPassword = () => {

    const {userPasswordReset} = useContext(AuthProviderContext)
    const navigate = useNavigate()
    const handleForgotPassword = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        userPasswordReset(email)
        .then(() => {
            toast.success("Reset password email send your email. please check your email inbox")
            navigate("/login-page")
        }).catch(error => {
            toast.error("Failed to send password reset email try again")
        })
    }
    return (
        <div className="text-center px-10">
            <h1 className="my-10 text-3xl font-extrabold text-[#E32D2D]">FORGOT YOUR PASSWORD</h1>
            <div>
                <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                    <Input name="email" type="email" inputMode="text"
                    label="Enter your email"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4" />
                </div>
                <Button type="submit" fullWidth className="text-sm font-semibold tracking-wider">Send email</Button>
                </form>
            </div>
            <div className="divider">Or</div>
            <p className="font-medium text-black/70 my-8"><Link to={"/login-page/login"} className="underline text-blue-500 hover:text-black/70 duration-300">Log in</Link> with password.</p>
        </div>
    );
};

export default ForgotPassword;