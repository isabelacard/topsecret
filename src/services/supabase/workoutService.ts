import type { workoutType } from "../../types/workoutTypes";

import supabase from "./config";

const getWorkouts = async (): Promise<workoutType[]> => {
    try {
        const { data: workouts, error } = await supabase
            .from("workouts")
            .select("*");

        if (error) {
            console.error("Error fetching workouts:", error);
            return [];
        }

        return workouts || [];
    } catch (error) {
        console.error("Unexpected error fetching workouts:", error);
        return [];
    }
};

export { getWorkouts };
