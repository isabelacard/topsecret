import { Link } from "react-router";
import { useMediaQuery } from "@mui/material";

import ContinueButton from "../../components/ContinueButton";
import DotsIndicator from "../../components/DotsIndicator";

export default function Onboarding1() {
    // Estado responsive
    const matches = useMediaQuery("(min-width:768px)");

    return (
        <div>
            {/*  VISTA DESKTOP*/}
            {matches && (
                <div id="full-page" className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url(./assets/background.png)" }}>
                    <div id="boarding1-container" className="w-120 h-150 bg-[#9872F0] rounded-3xl shadow-lg relative">
                        <img src="./assets/image1.png" alt="Onboarding ilustration" className="absolute top-1/3 left-65 transform -translate-x-1/2 -translate-y-1/3 w-80 h-55 object-contain" />

                        <img src="./assets/image2.png" alt="Onboarding title" className="absolute left-1/2 transform -translate-x-1/2 w-70 h-auto object-contain top-[5%]" />

                        <div id="boarding2-continer" className="w-120 h-70 bg-black rounded-3xl absolute bottom-0 flex flex-col items-center justify-start gap-5 px-8 pt-20">
                            <div id="dots-indicator" className="-mt-17">
                                <DotsIndicator active={0} />
                            </div>

                            <h1 className="text-3xl font-[neulis]">Be a fitter version</h1>

                            <h5 className="text-sm font-[poppins] w-[300px] leading-tight text-center">Post your progress and stay motivated every day</h5>

                            <ContinueButton />

                            <p>
                                <Link className="underline font-[poppins]" to="/entrypoint">
                                    Skip
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* VISTA RESPONSIVE */}
            {!matches && (
                <div
                    className="flex flex-col items-center justify-between h-screen bg-cover bg-center"
                    style={{
                        backgroundImage: "url(./assets/backgroundlogin.png)",
                    }}
                >
                    <div className="flex flex-col items-center justify-center mt-16 w-full">
                        <h1 className="text-[50px] font-[Neulis] font-bold text-[#CAD83B] mb-4 text-center -mt-6">Trevo</h1>

                        <div className="w-full flex justify-center">
                            <img src="./assets/image1.png" alt="Onboarding illustration" className="object-contain w-full max-w-[300px] h-auto" />
                        </div>
                    </div>

                    <div className="w-[100%] h-[480px] bg-black rounded-t-3xl flex flex-col items-center justify-center">
                        <div id="dots" className="-mt-10">
                            <DotsIndicator active={0} />
                        </div>

                        <div id="text" className="flex flex-col items-center justify-center text-center pt-13">
                            <h1 className="text-[28px] font-[neulis] text-white mt-6">Be a fitter version</h1>
                            <p className="text-sm font-[poppins] text-white w-[80%] leading-tight mt-8">Post your progress and stay motivated every day</p>
                        </div>

                        <div className="mt-6pt pt-20">
                            <ContinueButton />
                        </div>

                        <Link to="/entrypoint" className="underline font-[poppins] text-white mt-4">
                            Skip
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
