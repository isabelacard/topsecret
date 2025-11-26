import type { instructorType } from "../../types/instructorTypes";

import supabase from "./config";

const getInstructors = async (): Promise<instructorType[]> => {
    try {
        const { data: instructors, error } = await supabase
            .from("instructors")
            .select("*");

        if (error) {
            console.error("Error fetching instructors:", error);
            return [];
        }

        return instructors || [];
    } catch (error) {
        console.error("Unexpected error fetching instructors:", error);
        return [];
    }
};

export { getInstructors };
