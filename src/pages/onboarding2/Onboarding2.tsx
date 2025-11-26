import { useMediaQuery } from "@mui/material";

import ContinueButton2 from "../../components/ContinueButton2";
import DotsIndicator2 from "../../components/DotsIndicator2";

export default function Onboarding2() {
    const matches = useMediaQuery("(min-width:768px)");

    return (
        <>
            {matches && (
                <div
                    id="full-page"
                    className="h-screen flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url(./assets/background.png)" }}
                >
                    <div
                        id="boarding2-container"
                        className="w-120 h-150 bg-[#9872F0] rounded-3xl shadow-lg relative"
                    >
                        {/* Imagen principal */}
                        <img
                            src="./assets/image3.png"
                            alt="Onboarding illustration"
                            className="absolute top-1/3 left-61 transform -translate-x-1/2 -translate-y-1/3 w-90 h-60 object-contain"
                        />

                        {/* Título (imagen) */}
                        <img
                            src="./assets/image4.png"
                            alt="Onboarding title"
                            className="absolute left-1/2 transform -translate-x-1/2 w-70 h-auto object-contain top-[5%]"
                        />

                        {/* Caja inferior negra */}
                        <div
                            id="boarding2-content"
                            className="w-120 h-70 bg-black rounded-3xl absolute bottom-0 flex flex-col items-center justify-start gap-5 px-8 pt-20"
                        >
                            <div id="dots-indicator" className="-mt-16">
                                <DotsIndicator2 active={1} />
                            </div>

                            <h1 className="text-3xl font-[neulis] text-white">
                                Connect with pals
                            </h1>

                            <h5 className="text-sm w-60 text-center font-[poppins] text-white">
                                Meet people who share your vibe and grow together.
                            </h5>

                            <div className="mt-3">
                                <ContinueButton2 />
                            </div>
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
                    {/* Parte superior: título y personaje */}
                    <div className="flex flex-col items-center justify-center mt-16 w-full">
                        <h1 className="text-[50px] font-[Neulis] font-bold text-[#CAD83B] mb-4 text-center -mt-6">
                            Trevo
                        </h1>

                        <div className="w-full flex justify-center">
                            <img
                                src="./assets/image3.png"
                                alt="Onboarding illustration"
                                className="object-contain w-full max-w-[380px] h-auto"
                            />
                        </div>
                    </div>

                    {/* Parte inferior: caja negra */}
                    <div className="w-[100%] h-[480px] bg-black rounded-t-3xl flex flex-col items-center justify-center">
                        <div id="dots" className="-mt-10">
                            <DotsIndicator2 active={1} />
                        </div>

                        <div
                            id="text"
                            className="flex flex-col items-center justify-center text-center pt-13"
                        >
                            <h1 className="text-[28px] font-[neulis] text-white mt-6">
                                Connect with pals
                            </h1>

                            <p className="text-sm font-[poppins] text-white w-[80%] leading-tight mt-8">
                                Meet people who share your vibe and grow together.
                            </p>
                        </div>

                        <div className="mt-6 pt-20">
                            <ContinueButton2 />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

