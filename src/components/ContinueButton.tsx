import { Link } from "react-router";
import { useMediaQuery } from "@mui/material";

export default function ContinueButton() {
    const matches = useMediaQuery("(min-width:768px)"); // true = desktop, false = móvil

    return (
        <div id="continue-button" className="flex justify-center w-full">
            <Link to="/onboarding2">
                <button
                    className={`flex items-center justify-center mx-auto cursor-pointer bg-[#A480FF] text-white font-[poppins] rounded-full transition duration-300 hover:bg-[#956CFF] active:scale-95
  ${matches ? "px-16 py-2 text-base" : "w-[80%] px-35 py-2.5 text-lg"}`}
                >
                    Continue
                </button>
            </Link>
        </div>
    );
}

