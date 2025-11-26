import { Link } from "react-router";
import { useMediaQuery } from "@mui/material";

export default function Splash() {
    const matches = useMediaQuery("(min-width:600px)");

    return (
        <Link to="/onboarding1">
            <div className="w-screen h-screen relative cursor-pointer">
                <div className="absolute inset-0 bg-black">
                    <img src="/assets/backgroundsplash.png" alt="Fondo" className="w-full h-full object-cover" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <img src= "/assets/logo.png" alt="Logo" className={`${matches ? "w-22 h-22" : "w-35 h-35"} object-contain`} />
                </div>
            </div>
        </Link>
    );
}
