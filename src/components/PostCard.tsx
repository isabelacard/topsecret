import { useState, type FormEvent, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

import type { Posttype, comment } from "../types/postTypes";
import ContainerHashtag from "../pages/home/ContainerHashtag";
import { getCommentsByPostId, createComment } from "../services/supabase/commentService";
import { toggleLike, checkIfUserLiked } from "../services/supabase/postLikeService";
import { toggleCommentLike, checkIfUserLikedComment } from "../services/supabase/commentLikeService";
import authService from "../services/supabase/authService";
import { getUserProfile, type UserProfile } from "../services/supabase/userService";
import { getRelativeTime } from "../utils/dateUtils";

export default function PostCard({ post, currentUser }: { post: Posttype; currentUser: UserProfile }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<comment[]>([]);
    const [commentCount, setCommentCount] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);

    const commentsLoaded = useRef(false);
    const [userProfilePic, setUserProfilePic] = useState<string>("");

    useEffect(() => {
        const fetchCommentCount = async () => {
            const data = await getCommentsByPostId(post.id);
            setCommentCount(data.length);
        };
        fetchCommentCount();
    }, [post.id]);

    useEffect(() => {
        if (showComments && !commentsLoaded.current) {
            setLoadingComments(true);
            getCommentsByPostId(post.id).then(async (data) => {
                if (currentUser && currentUser.id) {
                    const commentsWithLikes = await Promise.all(
                        data.map(async (comment) => {
                            const liked = await checkIfUserLikedComment(comment.id, currentUser.id);
                            return { ...comment, liked };
                        })
                    );
                    setComments(commentsWithLikes);
                } else {
                    setComments(data.map(c => ({ ...c, liked: false })));
                }
                setCommentCount(data.length);
                setLoadingComments(false);
                commentsLoaded.current = true;
            });
        }
    }, [showComments, post.id, currentUser]);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            checkIfUserLiked(post.id, currentUser.id).then(setLiked);
        }
    }, [post.id, currentUser]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const authUser = await authService.getCurrentUser();
            if (authUser && authUser.email) {
                const userProfile = await getUserProfile(authUser.email);
                if (userProfile) {
                    setUserProfilePic(userProfile.profile_pic);
                }
            }
        };
        fetchUserProfile();
    }, []);

    const handleToggleLike = async () => {
        if (!currentUser || !currentUser.id) {
            console.error("User not logged in");
            return;
        }

        const result = await toggleLike(post.id, currentUser.id);
        if (result) {
            setLiked(result.liked);
            setLikeCount(result.likeCount);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (newComment.trim() === "") return;

        if (!currentUser || !currentUser.id) {
            console.error("User not logged in");
            return;
        }

        const createdComment = await createComment(post.id, currentUser.id, newComment);

        if (createdComment) {
            setComments([...comments, { ...createdComment, liked: false }]);
            setCommentCount(prev => prev + 1);
            setNewComment("");
        }
    };

    const handleLikeComment = async (commentId: number) => {
        if (!currentUser || !currentUser.id) {
            console.error("User not logged in");
            return;
        }

        const result = await toggleCommentLike(commentId, currentUser.id);
        if (result) {
            setComments((prevComments) =>
                prevComments.map((comment) => {
                    if (comment.id === commentId) {
                        return { 
                            ...comment, 
                            likes: result.likeCount, 
                            liked: result.liked 
                        };
                    }
                    return comment;
                })
            );
        }
    };

    return (
        <div className="w-full max-w-md mx-auto text-white rounded-2xl p-4 mt-4">
            {/* info de usuario post */}
            <div className="flex items-center gap-3 mb-3">
                <img src={post.profilepic} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h2 className="text-[15px] font-medium">{post.username}</h2>
                    <p className="text-[10px] text-gray-400">{getRelativeTime(post.date)}</p>
                </div>
            </div>

            {/* descripción post */}
            <p className="text-[13px] mb-3 font-[poppins]">{post.description}</p>

            {/* imagen post */}
            <img src={post.image} alt="post" className="w-full rounded-xl mb-3" />

            {/* botones postt */}
            <div className="flex items-center justify-between text-gray-300 text-sm">
                <div className="flex items-center gap-3">
                    <button onClick={handleToggleLike} className="flex items-center gap-1">
                        <Heart className={`w-5 h-5 cursor-pointer ${liked ? "fill-[#9872F0] text-[#9872F0]" : ""}`} />
                        <span>{likeCount}</span>
                    </button>

                    <button onClick={() => setShowComments(!showComments)} className="cursor-pointer flex items-center gap-1 hover:text-[#9872F0]">
                        <MessageCircle className="w-5 h-5" />
                        <span>{commentCount > 0 ? commentCount : ""}</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <ContainerHashtag text={post.hashtag} onClick={() => console.info(`Hashtag: #${post.hashtag}`)} />
                    <Share2 className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                </div>
            </div>

            {/* comentarioss uwu */}
            {showComments && (
                <div className="mt-3 border-t border-gray-700 pt-2 font-[poppins]">
                    {loadingComments ? (
                        <p className="text-xs text-gray-400">Loading comments...</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-2 mb-2">
                                <img src={comment.profilepic} alt="pfp" className="w-8 h-8 rounded-full object-cover" />
                                <div className="bg-[#2b2b2b] p-2 rounded-lg flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-xs font-semibold">{comment.username}</p>
                                        <span className="text-[10px] text-gray-400">• {getRelativeTime(comment.date)}</span>
                                    </div>
                                    <p className="text-[12px] mb-2 break-words">{comment.comment}</p>
                                    <button onClick={() => handleLikeComment(comment.id)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#9872F0]">
                                        <Heart className={`w-3 h-3 cursor-pointer ${comment.liked ? "fill-[#9872F0] text-[#9872F0]" : ""}`} />
                                        {comment.likes}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* nuevo comentario */}
                    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                        <img src={userProfilePic || "https://placehold.co/400"} alt="you" className="w-8 h-8 rounded-full object-cover" />
                        <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-[#2b2b2b] rounded-full px-3 py-1 text-sm outline-none" />
                        <button type="submit" className="text-[#9872F0] text-sm font-semibold cursor-pointer">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
