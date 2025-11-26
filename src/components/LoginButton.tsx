import { Link } from "react-router";
import { useMediaQuery } from "@mui/material";

export default function LoginButton() {
    const matches = useMediaQuery("(min-width:600px)");

    return (
        <div id="login-button">
            <Link to="/login">
                <button
                    className={`border-2 border-[#9872F0] text-white font-[poppins] rounded-full transition duration-300 hover:bg-[#9872F0] hover:text-white active:scale-95 cursor-pointer ${matches ? "text-base w-[250px] px-15 py-2.5" 
                        : "text-lg px-20 w-[300px] py-4"}`}
                >
                    Log in
                </button>
            </Link>
        </div>
    );
}
