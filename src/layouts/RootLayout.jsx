import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../pages/Footer";
import "../App.css"
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
    return (
        <div>
            <Toaster/>
            <Header/>
            <div className="min-h-[calc(100vh-300px)]">
                <Outlet/>
            </div>

            <Footer/>
            
        </div>
    );
};

export default RootLayout;