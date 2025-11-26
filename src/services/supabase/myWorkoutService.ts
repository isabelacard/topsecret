import type { myWorkoutType } from "../../types/myworkoutsTypes";

import supabase from "./config";

const getMyworkouts = async (): Promise<myWorkoutType[]> => {
    try {
        const { data: myworkouts, error } = await supabase
            .from("myworkouts")
            .select("*");

        if (error) {
            console.error("Error fetching myworkouts:", error);
            return [];
        }

        return myworkouts || [];
    } catch (error) {
        console.error("Unexpected error fetching myworkouts:", error);
        return [];
    }
};

export { getMyworkouts };
