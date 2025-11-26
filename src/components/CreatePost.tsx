import { useRef, useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

import { setMessage } from "../reducers/slice/MessageSlice";
import type { AppDispatch } from "../reducers/Store";
import type { Posttype } from "../types/postTypes";
import bucketService from "../services/supabase/bucketService";
import { createPost } from "../services/supabase/postService";
import authService from "../services/supabase/authService";
import { getHashtags, type HashtagType } from "../services/supabase/hashtagService";
import { getUserProfile } from "../services/supabase/userService";

type CreatePostProps = {
    onClose: () => void;
    onPost: (_newPost: Posttype) => void;
    onPostCreated?: () => void;
    currentUser: {
        username: string;
        profile_pic: string;
    };
};

export default function CreatePost({ onClose, onPost, onPostCreated, currentUser }: CreatePostProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [hashtags, setHashtags] = useState<HashtagType[]>([]);
    const categories = ["#gym", "#foodie", "#motivation", "#running"];
    const matches = useMediaQuery("(min-width:600px)");

    useEffect(() => {
        getHashtags().then(setHashtags);
    }, []);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImagePreview(null);
            setImageFile(null);
            return;
        }

        // TAMAÑO :3
        if (file.size > 3 * 1024 * 1024) {
            dispatch(setMessage({ message: "Image exceeds 3MB limit", severity: "error" }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setImageFile(file);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);

        const caption = formData.get("caption") as string;
        const category = formData.get("category") as string;

        // VACIOS
        if (!caption || !category) {
            dispatch(setMessage({ message: "Please complete all fields", severity: "warning" }));
            return;
        }

        if (!imageFile) {
            dispatch(setMessage({ message: "Image is required", severity: "warning" }));
            return;
        }

        const user = await authService.getCurrentUser();
        if (!user || !user.email) {
            dispatch(setMessage({ message: "User not logged in or email missing", severity: "error" }));
            return;
        }

        const userProfile = await getUserProfile(user.email);
        if (!userProfile) {
            dispatch(setMessage({ message: "User profile not found", severity: "error" }));
            return;
        }

        // Upload image
        const uploadResult = await bucketService.uploadImage(imageFile, "post_images");
        if (!uploadResult.success || !uploadResult.url) {
            dispatch(setMessage({ message: "Error uploading image", severity: "error" }));
            return;
        }
        const imageUrl = uploadResult.url;

        //hashtag ID
        const selectedHashtag = hashtags.find((h) => h.name === category || h.name === category.replace("#", ""));

        if (!selectedHashtag) {
            dispatch(setMessage({ message: "Invalid category", severity: "error" }));
            return;
        }

        const today = new Date();
        const dateFormatted = today.toISOString();

        const newPostData = {
            user_id: userProfile.id,
            description: caption,
            image: imageUrl,
            hashtag_id: selectedHashtag.id,
            date: dateFormatted,
            username: currentUser.username,
            profile_pic: currentUser.profile_pic,
        };

        const result = await createPost(newPostData);

        if (result.success && result.post) {
            dispatch(setMessage({ message: "Post created successfully", severity: "success" }));
            onPost(result.post);
            if (onPostCreated) onPostCreated(); // Refrescar posts desde Supabase
            onClose();
        } else {
            dispatch(setMessage({ message: "Error creating post", severity: "error" }));
        }
    };

    return (
        <div className={`${matches ? "m-0" : "m-2"}`}>
            <div className="">
                <h3 className={`${matches ? "text-1xl" : "text-xl"} font-bold mb-4 text-[#CAD83B]`}>Create a new post</h3>
            </div>
            <form ref={formRef} onSubmit={handleSubmit}>
                <textarea name="caption" placeholder="Write a comment..." className={`textarea bg-[#000000] textarea-bordered w-full ${matches ? "mb-4 " : "mb-8"} border-[#CAD83B] ${matches ? "h-24" : "h-20"} ${matches ? "text-1xl" : "text-sm"}`} />

                <div className={`text-left ${matches ? "text-base" : "text-sm mb-8"} text-gray-300 ${matches ? "mb-6" : "mb-4"}`}>
                    <label className="block mb-2">Choose a section :</label>
                    <div className={`flex ${matches ? "justify-left gap-6" : "justify-left gap-3 flex-wrap"}`}>
                        {categories.map((cat: string) => (
                            <label key={cat} className="flex items-center gap-1">
                                <input type="radio" name="category" value={cat} className="accent-[#D2F200]" />
                                <span className={`text-gray-300 ${matches ? "text-[13px]" : "text-sm"}`}>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className={`file-input file-input-bordered w-full ${matches ? "mb-4" : "mb-8"} border-[#CAD83B] bg-[#000000] ${matches ? "file-input-md" : "file-input-sm"} ${matches ? "text-1xl" : "text-sm"}`}
                    onChange={handleImageUpload}
                />

                {imagePreview && <img src={imagePreview} alt="Preview" className={`rounded-xl ${matches ? "mb-4 max-h-60" : "mb-3 max-h-40"} object-cover w-full`} />}

                <div className={`flex ${matches ? "justify-end gap-2" : "justify-center gap-3 flex-col sm:flex-row"}`}>
                    <button type="button" onClick={onClose} className={`btn rounded-2xl font-[poppins] ${matches ? "btn-md text-[12px]" : " mb-1 btn-sm text-sm w-full sm:w-auto"}`}>
                        Cancel
                    </button>
                    <button type="submit" className={`btn bg-[#CAD83B] rounded-2xl font-[poppins] text-black ${matches ? "btn-md text-[12px]" : "btn-sm text-sm w-full sm:w-auto"}`}>
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
}
