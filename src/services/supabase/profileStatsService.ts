import supabase from "./config";

export type ProfileStats = {
    username: string;
    profilePic: string;
    posts: number;
    followers: number;
    workouts: number;
};

const getProfileStats = async (userEmail: string): Promise<ProfileStats | null> => {
    try {
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, username, profile_pic")
            .eq("email", userEmail)
            .single();

        if (userError || !userData) {
            console.error("Error fetching user:", userError);
            return null;
        }

        const { count: postsCount } = await supabase
            .from("posts")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userData.id);

        const { count: workoutsCount } = await supabase
            .from("myworkouts")
            .select("*", { count: "exact", head: true });

        const { count: followersCount } = await supabase
            .from("followers")
            .select("*", { count: "exact", head: true })
            .eq("following_id", userData.id);

        return {
            username: userData.username,
            profilePic: userData.profile_pic,
            posts: postsCount || 0,
            followers: followersCount || 0,
            workouts: workoutsCount || 0,
        };
    } catch (error) {
        console.error("Error in getProfileStats:", error);
        return null;
    }
};

export { getProfileStats };
