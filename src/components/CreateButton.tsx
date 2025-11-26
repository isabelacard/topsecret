import { useMediaQuery } from "@mui/material";
import { Link } from "react-router";

export default function CreateButton() {
    const matches = useMediaQuery("(min-width:600px)");

    return (
        <div id="create-button">
            <Link to="/signup">
                <button className={`bg-[#A480FF] text-white font-[poppins] rounded-full transition duration-300 hover:bg-[#956CFF] active:scale-95 cursor-pointer ${matches ? "text-base px-15 py-2.5" : "text-lg px-20 py-4"}`}>
                    Create account
                </button>
            </Link>
        </div>
    );
}
