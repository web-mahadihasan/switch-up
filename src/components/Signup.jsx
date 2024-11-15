import { Button, Checkbox, Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthProviderContext } from "../provider/AuthProvider";
import { FacebookAuthProvider, GoogleAuthProvider, sendEmailVerification, signOut, TwitterAuthProvider, updateCurrentUser, updateProfile } from "firebase/auth";
import auth from "../firebase.init";
import Loader from "./Loader";

const Signup = () => {
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [singupPassword, setSignupPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [invalidSignupEmail, setInvalidSignupEmail] = useState(false);
    const [showEmailCheck, setShowEmailCheck] = useState(false);
    const [invalidSignupPassword, setInvalidSignupPassword] = useState(false);
    const [invalidConfirmPassword, setInvalidSignupRePassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [showConfirmPasswordCheck, setShowRePasswordCheck] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    const {createUser, loading, loginWithSocial} = useContext(AuthProviderContext);
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider;
    const twitterProvider = new TwitterAuthProvider;
    const facebookProvider = new FacebookAuthProvider;

    // handle user name 
    const handleSignupName = (e) => {
        const inputName = e.target.value
        setSignupName(inputName)
    }
    // Handle user signup email 
    const handleSignupEmail = (e) => {
        const inputEmail = e.target.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validationEmail = emailRegex.test(inputEmail);
        if(inputEmail.length > 0){
            if(!validationEmail){
                setShowEmailCheck(false)
                setInvalidSignupEmail(true)
            }else{
                setShowEmailCheck(true)
                setInvalidSignupEmail(false)
                setSignupEmail(inputEmail)
            }
        }else{
            setInvalidSignupEmail(false)
        }
    }
    // Handle user Signup password 
    const handleSignupPassword = (e) => {
        const inputPassword = e.target.value
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const validatePassword = passwordRegex.test(inputPassword);
        if(inputPassword.length > 0){
            if(!validatePassword){
                setInvalidSignupPassword(true)
                setShowPasswordCheck(false) 
            }else{
                setShowPasswordCheck(true)
                setInvalidSignupPassword(false)
                setSignupPassword(inputPassword)
            }
        }else{
            setInvalidSignupPassword(false)
        }
    }
    // Handle user confirm password
    const handleSignupConfirmPassword = (e) => {
        const inputRePassword = e.target.value
        if(inputRePassword.length > 0){
            if(inputRePassword !== singupPassword){
                setInvalidSignupRePassword(true)
                setShowRePasswordCheck(false)
            }else{
                setShowRePasswordCheck(true)
                setInvalidSignupRePassword(false)
            }
        }else{
            setInvalidSignupRePassword(false)
        }
    }
    // Handle term and condition check 
    const handleSignupCheck = (e) => {
        const signupCheck = e.target.checked
        if(signupCheck){
            setIsChecked(true)
        }else{
            setIsChecked(false)
        }
    }

    // Handle image file and generate link 
    const handleImageUpload =  (e) => {
        let imgLink = e.target.files[0]
        const imgData = new FormData()
        imgData.append("image", imgLink)
        fetch('https://api.imgbb.com/1/upload?key=176775b308da684d8b761f7bdfe641cd',
        {
            method: "POST",
            body: imgData
        })
        .then(res => res.json())
        .then(data => setImageURL(data.data.url))
      };

    // sign up form handle 
    const handleSignup = (e) => {
        e.preventDefault()
        if(isChecked == false){
            toast.error("Accept our terms and conditions")
            return
        }
        createUser(signupEmail, singupPassword)
        .then((result) => {
            sendEmailVerification(auth.currentUser)
            .then(() => {    
            })
            const addProfielInfo = {
                displayName: signupName,
                photoURL: imageURL
            }
            updateProfile(auth.currentUser, addProfielInfo)
            .then(() => {
                toast.success("Successfully create account. Please check your email")
                signOut(auth).then(() => {
                    console.log("signout user")
                }).catch((error) => {
                    console.log(error)
                })
                if(loading){
                    navigate('/login-page/loading')
                    setTimeout(() => { 
                    navigate("/login-page")
                    }, 1000);
                   }
            }).catch(error => {
                console.log(error)
            }) 
        }).catch(error => {
            console.log(error)
        })
    }
    const handleSocialSignup = (providerName) => {
        loginWithSocial(providerName)
        .then((result) => {
            toast.success("Successfully login")
            navigate("/")
        }).catch(error => {
            toast.error("Failed to login")
        })
    }


    return (
        <div className="text-center px-10">
            <h1 className="my-10 text-4xl font-extrabold text-[#E32D2D]">SIGN UP</h1>
            <div>
                <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative">
                    <Input onChange={handleSignupName} type="text" inputMode="text" required
                        label="Your full name"
                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4" />
                    {
                        signupName && <p className="absolute top-3 right-2"><MdDone className="text-green-400"/></p>
                    }
                </div>
                <div className="relative">
                    <Input onChange={handleSignupEmail}  type="email" inputMode="text" required
                    label="Enter email"
                    className="font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4" />
                    {
                        showEmailCheck && <p className="absolute top-3 right-2"><MdDone className="text-green-400"/></p>
                    }
                    {
                        invalidSignupEmail && <p className="text-red-500 text-sm text-left">Your email in Invalid. Enter a valid email</p>
                    }
                </div>
                <div className="relative">
                    <Input onChange={handleSignupPassword} type={showPassword? "text": "password"} inputMode="text" required
                    label="Enter password"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4" />
                    <div onClick={()=> setShowPassword(!showPassword)} className="absolute top-2 right-2">
                        {showPassword? <IoEyeOffOutline size={20} /> : <FaRegEye size={20}/>}
                    </div>
                    {
                        showPasswordCheck && <p className="absolute top-3 right-8"><MdDone className="text-green-400"/></p>
                    }
                    {
                        invalidSignupPassword && <p className="text-red-500 text-sm text-left">Password should be At least one uppercase, lower case, special character, number and 8 digits.</p>
                    }
                </div>
                <div className="relative">
                    <Input onChange={handleSignupConfirmPassword}  type={showConfirmPassword? "text": "password"} inputMode="text" required
                    label="Confirm password"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-lg bg-base-200 py-4" />
                    <div onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className="absolute top-2 right-2">
                        {showConfirmPassword? <IoEyeOffOutline size={20} /> : <FaRegEye size={20}/>}
                    </div>
                    {
                        showConfirmPasswordCheck && <p className="absolute top-3 right-8"><MdDone className="text-green-400"/></p>
                    }
                    {
                        invalidConfirmPassword && <p className="text-red-500 text-sm text-left">Your password don't match.</p>
                    }
                </div>
                <div className="">
                    <input onChange={handleImageUpload} name="imgFile" type="file" className="file-input file-input-bordered file-input-md w-full max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                    <Checkbox onChange={handleSignupCheck} label="I agree terms and conditions" />
                </div>
                <Button fullWidth type="submit" className="text-sm font-semibold tracking-wider">Sign up</Button>
                </form>
            </div>
            <p className="font-medium text-black/70 my-5">Already have an account? <Link to={"/login-page/login"} className="underline text-blue-500 hover:text-black/70 duration-300">Login here</Link></p>
            <div className="divider">Or Connect with</div>
            <div className="space-x-6 my-6">
                <button onClick={()=> handleSocialSignup(googleProvider)} className="border p-3 bg-[#FDF5F5] shadow-lg border-gray-200"><FcGoogle size={22} /></button>
                <button onClick={()=> handleSocialSignup(facebookProvider)} className="border p-3 bg-[#FDF5F5] shadow-lg border-gray-200"><FaFacebook size={22} className="text-blue-700"/></button>
                <button onClick={()=> handleSocialSignup(twitterProvider)} className="border p-3 bg-[#FDF5F5] shadow-lg border-gray-200"><BsTwitterX size={22} /></button>
            </div>
        </div>
    );
};

export default Signup;