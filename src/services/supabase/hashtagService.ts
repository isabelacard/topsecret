import supabase from "./config";

export type HashtagType = {
    id: number;
    name: string;
};

const getHashtags = async (): Promise<HashtagType[]> => {
    try {
        const { data, error } = await supabase
            .from("hashtags")
            .select("*");

        if (error) {
            console.error("Error fetching hashtags:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Unexpected error fetching hashtags:", error);
        return [];
    }
};

export { getHashtags };
