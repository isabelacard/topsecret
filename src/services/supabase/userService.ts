import supabase from "./config";

export type UserProfile = {
    id: number;
    username: string;
    email: string;
    profile_pic: string;
};

const getUserProfile = async (email: string): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email) 
            .single();

        if (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Unexpected error fetching user profile:", error);
        return null;
    }
};

export { getUserProfile };
