import type { comment } from "../../types/postTypes";

import supabase from "./config";

const getCommentsByPostId = async (postId: number): Promise<comment[]> => {
    try {
        const { data: commentsData, error } = await supabase
            .from("comments")
            .select(`
                *,
                users (
                    username,
                    profile_pic
                )
            `)
            .eq("post_id", postId)
            .order("id", { ascending: true });

        if (error) {
            console.error("Error fetching comments:", error);
            return [];
        }

        const commentsWithLikes = await Promise.all(
            commentsData?.map(async (comment) => {
                const { count: likesCount } = await supabase
                    .from("comments_likes")
                    .select("*", { count: "exact", head: true })
                    .eq("comment_id", comment.id);

                return {
                    id: comment.id,
                    username: comment.users?.username || "Unknown",
                    profilepic: comment.users?.profile_pic || "",
                    comment: comment.comment || "",
                    likes: likesCount || 0,
                    liked: false,
                    date: comment.date
                };
            }) || []
        );

        return commentsWithLikes;
    } catch (error) {
        console.error("Unexpected error fetching comments:", error);
        return [];
    }
};

const createComment = async (postId: number, userId: number, text: string): Promise<comment | null> => {
    try {
        const today = new Date();
        const dateFormatted = today.toLocaleDateString("es-CO");

        const { data, error } = await supabase
            .from("comments")
            .insert([
                {
                    post_id: postId,
                    user_id: userId,
                    comment: text,
                    date: dateFormatted
                }
            ])
            .select(`
                *,
                users (
                    username,
                    profile_pic
                )
            `)
            .single();

        if (error) {
            console.error("Error creating comment:", error);
            return null;
        }

        return {
            id: data.id,
            username: data.users?.username || "Unknown",
            profilepic: data.users?.profile_pic || "",
            comment: data.comment,
            likes: data.likes || 0,
            liked: false,
            date: data.date
        };
    } catch (error) {
        console.error("Unexpected error creating comment:", error);
        return null;
    }
};

export { getCommentsByPostId, createComment };
