import supabase from "./config";

const toggleLike = async (postId: number, userId: number): Promise<{ liked: boolean; likeCount: number } | null> => {
    try {
        const { data: existingLike } = await supabase
            .from("likes")
            .select("id")
            .eq("post_id", postId)
            .eq("user_id", userId)
            .maybeSingle();

        let liked = false;

        if (existingLike) {
            const { error: deleteError } = await supabase
                .from("likes")
                .delete()
                .eq("post_id", postId)
                .eq("user_id", userId);

            if (deleteError) {
                console.error("Error removing like:", deleteError);
                return null;
            }
            liked = false;
        } else {
            const { error: insertError } = await supabase
                .from("likes")
                .insert([
                    {
                        post_id: postId,
                        user_id: userId
                    }
                ]);

            if (insertError) {
                console.error("Error adding like:", insertError);
                return null;
            }
            liked = true;
        }

        const { count, error: countError } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("post_id", postId);

        if (countError) {
            console.error("Error counting likes:", countError);
            return null;
        }

        return {
            liked,
            likeCount: count || 0
        };
    } catch (error) {
        console.error("Unexpected error toggling like:", error);
        return null;
    }
};

const checkIfUserLiked = async (postId: number, userId: number): Promise<boolean> => {
    try {
        const { data } = await supabase
            .from("likes")
            .select("id")
            .eq("post_id", postId)
            .eq("user_id", userId)
            .maybeSingle();

        return data !== null;
    } catch (error) {
        console.error("Unexpected error checking like:", error);
        return false;
    }
};

export { toggleLike, checkIfUserLiked };
