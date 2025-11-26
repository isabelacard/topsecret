import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

import { getMyworkouts } from "../../services/supabase/myWorkoutService";
import type { myWorkoutType } from "../../types/myworkoutsTypes";
import NavBar from "../../components/NavBar";
import NavBarResponsive from "../../components/NavBarResponsive";
import MyWorkoutCard from "../../components/MyWorkoutCard"; 
import Loading from "../../components/Loading"; 

export default function MyWorkouts() {
    const [myworkouts, setMyworkouts] = useState<myWorkoutType[]>([]);
    const matches = useMediaQuery("(min-width:600px)");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyworkouts = async () => {
            setLoading(true);
            const data = await getMyworkouts();
            setMyworkouts(data);
            setLoading(false);
        };
        fetchMyworkouts();
    }, []);

    return (
        <div
            className={`min-h-screen text-white flex ${matches ? "flex-row" : "flex-col"}`}
            style={{
                backgroundImage: "url(./assets/backgroundProfile.png)",
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

            <div className={`${matches ? "ml-[330px] mt-[30px] flex flex-col pt-8" : "flex flex-col pt-4 pb-20 px-4 mt-5"} flex-1`}>
                <div className="px-8 mb-6 font-[neulis]">
                    <h1 className="text-white text-[25px] font-medium">My Workouts</h1>
                </div>

                <div className="flex-1 px-8 ">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className={`${matches ? "grid grid-cols-1 gap-6 max-w-2xl" : "grid grid-cols-1 gap-4"}`}>
                            {myworkouts.map((workout) => (
                                <MyWorkoutCard key={workout.id} workout={workout} onClick={() => console.info("Workout clicked:", workout.title)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
