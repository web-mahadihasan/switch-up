import { useContext } from "react";
import { AuthProviderContext } from "../provider/AuthProvider";

const Home = () => {
    const {name} = useContext(AuthProviderContext)
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center font-bold text-4xl mt-10">I am home page {name}</h1>
        </div>
    );
};

export default Home;