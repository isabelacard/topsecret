import { useMediaQuery } from "@mui/material";

import CreateButton from "../../components/CreateButton";
import LoginButton from "../../components/LoginButton";

export default function Entrypoint() {
    const matches = useMediaQuery("(min-width:600px)");

    return (
        <div id="full-page" className="h-screen flex items-center justify-center bg-cover bg-center text-white" style={{ backgroundImage: "url(/assets/background.png)" }}>
            <div id="entry-container" className={`relative flex flex-col items-center justify-center text-center ${matches ? "bg-[#121212] w-120 h-133 rounded-3xl shadow-lg" : "w-full h-full bg-transparent"}`}>
                <h1 className={`text-center font-[neulis] text-white ${matches ? "text-[60px] p-8" : "text-[55px] mt-15"}`}> Welcome to</h1>

                <h2 className={`text-center text-[#CAD83B] font-[neulis] ${matches ? "text-[60px] -mt-[60px]" : "text-[55px] -mt-[15px]"}`}>Trevo</h2>

                <img src="/assets/logoentrypoint.png" alt="logo illustration" className={`${matches ? "h-15 w-15 mt-[20px]" : "h-20 w-20 mt-20"} mx-auto`} />
                
                <h3
                    className={`text-center font-[poppins] text-white ${matches ? "text-[25px] w-80 leading-[34px] mt-[30px] font-medium" : "text-[30px] w-[90%] leading-[35px] mt-20"}`}>
                    Where fitness meets friends
                </h3>

                <div className={`flex flex-col items-center ${matches ? "mt-6 mb-6 gap-[10px]" : "mt-22 gap-4 w-full"}`}>
                    <CreateButton />
                    <LoginButton />
                </div>
            </div>
        </div>
    );
}
