import type { Posttype } from "../../types/postTypes";

import supabase from "./config";

const getPosts = async (): Promise<Posttype[]> => {
    try {
        const { data: posts, error } = await supabase.from("posts").select(`
                *,
                users (
                    username,
                    profile_pic
                ),
                hashtags (
                    name
                )
            `)
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
            return [];
        }

        if (!posts) return [];

        const postsWithDetails = await Promise.all(
            posts.map(async (post) => {
                const { count: likesCount } = await supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_id", post.id);

                return {
                    id: post.id,
                    profilepic: post.users?.profile_pic || "",
                    username: post.users?.username || "Unknown",
                    date: post.date,
                    description: post.description,
                    image: post.image,
                    likes: likesCount || 0,
                    hashtag_id: post.hashtag_id,
                    hashtag: post.hashtags?.name || "",
                };
            })
        );

        return postsWithDetails as Posttype[];
    } catch (error) {
        console.error("Unexpected error fetching posts:", error);
        return [];
    }
};

const createPost = async (post: {
    user_id: number;
    description: string;
    image: string;
    hashtag_id: number;
    date: string;
}) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .insert([post])
            .select()
            .single();

        if (error) {
            console.error("Error creating post:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Unexpected error creating post:", error);
        return null;
    }
};

export { getPosts, createPost };
