import supabase from "./config";

const toggleCommentLike = async (commentId: number, userId: number): Promise<{ liked: boolean; likeCount: number } | null> => {
    try {
        const { data: existingLike } = await supabase
            .from("comments_likes")
            .select("id")
            .eq("comment_id", commentId)
            .eq("user_id", userId)
            .maybeSingle();

        let liked = false;

        if (existingLike) {
            const { error: deleteError } = await supabase
                .from("comments_likes")
                .delete()
                .eq("comment_id", commentId)
                .eq("user_id", userId);

            if (deleteError) {
                console.error("Error removing comment like:", deleteError);
                return null;
            }
            liked = false;
        } else {
            const { error: insertError } = await supabase
                .from("comments_likes")
                .insert([
                    {
                        comment_id: commentId,
                        user_id: userId
                    }
                ]);

            if (insertError) {
                console.error("Error adding comment like:", insertError);
                return null;
            }
            liked = true;
        }

        const { count, error: countError } = await supabase
            .from("comments_likes")
            .select("*", { count: "exact", head: true })
            .eq("comment_id", commentId);

        if (countError) {
            console.error("Error counting comment likes:", countError);
            return null;
        }

        return {
            liked,
            likeCount: count || 0
        };
    } catch (error) {
        console.error("Unexpected error toggling comment like:", error);
        return null;
    }
};

const checkIfUserLikedComment = async (commentId: number, userId: number): Promise<boolean> => {
    try {
        const { data } = await supabase
            .from("comments_likes")
            .select("id")
            .eq("comment_id", commentId)
            .eq("user_id", userId)
            .maybeSingle();

        return data !== null;
    } catch (error) {
        console.error("Unexpected error checking comment like:", error);
        return false;
    }
};

export { toggleCommentLike, checkIfUserLikedComment };
