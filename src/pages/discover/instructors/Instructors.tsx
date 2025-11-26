import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMediaQuery } from "@mui/material";

import NavBar from "../../../components/NavBar";
import NavBarResponsive from "../../../components/NavBarResponsive";
import { getInstructors } from "../../../services/instructorServices";
import type { instructorType } from "../../../types/instructorTypes";
import InstructorCard from "../../../components/InstructorCard";

export default function Instructors() {
    const [instructors, setInstructors] = useState<instructorType[]>([]);
    const matches = useMediaQuery("(min-width:600px)");

    useEffect(() => {
        const fetchInstructors = async () => {
            const data = await getInstructors();
            setInstructors(data);
        };
        fetchInstructors();
    }, []);

    return (
        <div
            className={`min-h-screen text-white flex ${matches ? "flex-row" : "flex-col"}`}
            style={{
                backgroundImage: "url(/trevo/assets/backgroundProfile.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            {matches && (
                <div className="fixed top-0 left-0 h-full w-[330px] z-10">
                    <NavBar />
                </div>
            )}

            {!matches && (
                <div className="fixed bottom-0 left-0 w-full z-10">
                    <NavBarResponsive />
                </div>
            )}

            <div className={`${matches ? "ml-[330px] flex flex-row items-center" : "flex flex-col pt-4 pb-20 px-4 mt-5"} flex-1`}>
                <div
                    className={`${matches ? "w-[230px] h-[600px] border-r-2 border-gray-600 flex flex-col justify-center pl-8 gap-8 pb-40" 
                        : "flex justify-center gap-10 mb-8 pt-7 fixed top-0 left-0 right-0 bg-[#1E1E1E] bg-opacity-90 backdrop-blur-sm p-4 z-20"}`}
                >
                    <Link to="/auth/discover/instructors" className="text-white text-[20px] font-medium font-[neulis]">
                        Instructors
                    </Link>
                    <Link to="/auth/discover/workouts" className="text-gray-400 text-[20px] font-medium hover:text-white transition-colors font-[neulis]">
                        Workouts
                    </Link>
                </div>

                <div className="flex-1 p-8 flex justify-center items-center">
                    <div className={`${matches ? "grid grid-cols-2 gap-6 max-w-2xl" : "grid grid-cols-1 gap-6 mb-25 max-w-sm mt-7"} mx-auto`}>
                        {instructors.map((instructor, index) => {
                            console.info(`Rendering instructor ${index}:`, instructor);
                            return <InstructorCard key={index} instructor={instructor} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
