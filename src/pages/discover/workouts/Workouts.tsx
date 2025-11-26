import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMediaQuery } from "@mui/material";

import NavBar from "../../../components/NavBar";
import NavBarResponsive from "../../../components/NavBarResponsive";
import WorkoutCard from "../../../components/WorkoutCard";
import { getWorkouts } from "../../../services/supabase/workoutService";
import type { workoutType } from "../../../types/workoutTypes";
import Loading from "../../../components/Loading";

export default function Workouts() {
    const [workouts, setWorkouts] = useState<workoutType[]>([]);
    const matches = useMediaQuery("(min-width:600px)");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            const data = await getWorkouts();
            setWorkouts(data);
            setLoading(false);
        };
        fetchWorkouts();
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
                    <Link to="/auth/discover/instructors" className="text-gray-400 hover:text-white text-[20px] transition-colors font-medium font-[neulis]">
                        Instructors
                    </Link>
                    <Link to="/auth/discover/workouts" className="text-white text-[20px] font-medium font-[neulis]">
                        Workouts
                    </Link>
                </div>

                <div className="flex-1 p-8 flex justify-center items-center">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className={`${matches ? "grid grid-cols-4 gap-6 max-w-2xl" : "grid grid-cols-2 gap-6 mb-25 max-w-sm mt-7"} mx-auto`}>
                            {workouts.map((workout) => (
                                <WorkoutCard key={workout.id} workout={workout} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
