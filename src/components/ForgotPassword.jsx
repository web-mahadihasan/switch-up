import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="text-center px-10">
            <h1 className="my-10 text-3xl font-extrabold text-[#E32D2D]">FORGOT YOUR PASSWORD</h1>
            <div>
                <form action="" className="space-y-5">
                <div>
                    <Input type="text" inputMode="text"
                    label="Enter your email"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4" />
                </div>
                <Button fullWidth className="text-sm font-semibold tracking-wider">Send email</Button>
                </form>
            </div>
            <div className="divider">Or</div>
            <p className="font-medium text-black/70 my-8"><Link to={"/login-page/login"} className="underline text-blue-500 hover:text-black/70 duration-300">Log in</Link> with password.</p>
        </div>
    );
};

export default ForgotPassword;