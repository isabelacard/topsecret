import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { getPosts } from "../../services/supabase/postService";
import type { Posttype } from "../../types/postTypes";
import NavBar from "../../components/NavBar";
import PostCard from "../../components/PostCard";
import NavBarResponsive from "../../components/NavBarResponsive";
import authService from "../../services/supabase/authService";
import { getProfileStats, type ProfileStats } from "../../services/supabase/profileStatsService";
import supabase from "../../services/supabase/config";
import bucketService from "../../services/supabase/bucketService";
import { setMessage } from "../../reducers/slice/MessageSlice";
import type { AppDispatch } from "../../reducers/Store";
import Loading from "../../components/Loading";

export default function Profile() {
    const matches = useMediaQuery("(min-width:768px)");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [userPosts, setUserPosts] = useState<Posttype[]>([]);
    const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 3 * 1024 * 1024) {
            dispatch(setMessage({ message: "Image exceeds 3MB limit", severity: "error" }));
            return;
        }

        setNewProfilePic(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = async () => {
        if (!newUsername && !newProfilePic) {
            dispatch(setMessage({ message: "No changes to save", severity: "warning" }));
            return;
        }

        try {
            const authUser = await authService.getCurrentUser();
            if (!authUser || !authUser.email) {
                dispatch(setMessage({ message: "User not authenticated", severity: "error" }));
                return;
            }

            let profilePicUrl = currentUser.profile_pic;

            // FOTOKKK
            if (newProfilePic) {
                const uploadResult = await bucketService.uploadImage(newProfilePic, "profile_pictures");
                if (!uploadResult.success || !uploadResult.url) {
                    dispatch(setMessage({ message: "Error uploading image", severity: "error" }));
                    return;
                }
                profilePicUrl = uploadResult.url;
            }

            // USER EN SUPABASE
            const updateData: { username?: string; profile_pic?: string } = {};
            if (newUsername) updateData.username = newUsername;
            if (profilePicUrl !== currentUser.profile_pic) updateData.profile_pic = profilePicUrl;

            const { error } = await supabase.from("users").update(updateData).eq("email", authUser.email);

            if (error) {
                console.error("Error updating profile:", error);
                dispatch(setMessage({ message: "Error updating profile", severity: "error" }));
                return;
            }

            // LOCAL
            const updatedUser = {
                ...currentUser,
                ...updateData,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            dispatch(setMessage({ message: "Profile updated successfully", severity: "success" }));

            // PROFILE
            const stats = await getProfileStats(authUser.email);
            setProfileStats(stats);

            // CERRAR Y RESETEARRRR
            setSettingsOpen(false);
            setNewUsername("");
            setNewProfilePic(null);
            setPreviewImage(null);

            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            dispatch(setMessage({ message: "Unexpected error", severity: "error" }));
        }
    };

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const defaultProfilePic = "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg";

    /* -------------------------- NAVBAR SCROLL EN RESPONSIVE -------------------------- */
    const [isSmall, setIsSmall] = useState(false);
    useEffect(() => {
        if (matches) return;
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY === 0) {
                setIsSmall(false);
            } else {
                setIsSmall(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [matches]);
    /* ------------------------------ FETCH POST ------------------------------ */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Obtener usuario autenticado
                const authUser = await authService.getCurrentUser();
                if (!authUser || !authUser.email) {
                    console.error("No authenticated user");
                    setLoading(false);
                    return;
                }

                // Obtener estadísticas del perfil
                const stats = await getProfileStats(authUser.email);
                setProfileStats(stats);

                // Obtener todos los posts y filtrar por el usuario actual
                const allPosts = await getPosts();
                const filtered = allPosts.filter((post: Posttype) => post.username === stats?.username);
                setUserPosts(filtered);

                setLoading(false);
            } catch (err) {
                console.error("Error al cargar los datos:", err);
                setUserPosts([]);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* --------------------------- VISTA DESKTOP --------------------------- */}
            {matches && (
                <div id="full-page" className="fixed top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/trevo/assets/backgroundProfile.png)" }}>
                    {/* NAVBAR */}
                    <div id="navbar" className="fixed top-0 left-0 h-full w-[20%] min-w-[280px] max-w-[330px]">
                        <NavBar />
                    </div>
                    {/* CONTENIDO */}
                    <div id="content" className="ml-[20%] flex flex-col p-6 min-h-screen text-white font-[neulis]">
                        {/* CONTENEDOR NEGRO */}
                        <div id="info" className="flex items-center bg-black p-[2vw] rounded-b-[2vw] h-[200px] left-[300px] right-0 w-auto fixed top-0 m-0 z-20">
                            {/* FOTO */}
                            <img src={profileStats?.profilePic || defaultProfilePic} className="w-[10vw] h-[10vw] rounded-full object-cover mr-[2vw]" />

                            <div className="flex flex-col flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-[3vw]">
                                        {/* USERNAME */}
                                        <h2 className="text-[1.8vw] font-semibold text-[#C8F442] ml-[1vw]">{loading ? "Loading..." : profileStats?.username || currentUser.username}</h2>

                                        {/* STATS */}
                                        <div id="profile-data" className="flex space-x-[4vw] ml-[5vw]">
                                            <div className="text-center">
                                                <p className="text-[1.8vw] font-bold text-[#A480FF]">{profileStats?.posts || 0}</p>
                                                <p className="text-[1vw] text-gray-300">Posts</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[1.8vw] font-bold text-[#A480FF]">{profileStats?.followers || 0}</p>
                                                <p className="text-[1vw] text-gray-300">Followers</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[1.8vw] font-bold text-[#A480FF]">{profileStats?.workouts || 0}</p>
                                                <p className="text-[1vw] text-gray-300">Workouts</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ICONOS */}
                                    <div id="icons" className="flex items-center space-x-[2vw] mr-[2vw]">
                                        <Settings size={30} color="#C8F442" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSettingsOpen(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* POSTS DESKTOP */}
                        <div className="mt-[170px] ml-[15vw] overflow-y-auto max-h-[70vh] pr-2 ">
                            {loading ? (
                                <Loading />
                            ) : userPosts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 max-w-2xl">
                                    {userPosts.map((post: Posttype) => (
                                        <PostCard key={post.id} post={post} currentUser={currentUser} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 mt-10">
                                    <p className="text-lg">No posts yet</p>
                                    <p className="text-sm">Share your first workout!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* --------------------------- VISTA RESPONSIVE --------------------------- */}
            {!matches && (
                <div id="full-page-mobile" className="w-full min-h-screen bg-cover bg-center pb-24" style={{ backgroundImage: "url(/trevo/assets/backgroundProfile.png)" }}>
                    {/* NAVBAR RESPONSIVE */}
                    <div className="fixed bottom-0 w-full z-50">
                        <NavBarResponsive />
                    </div>
                    {/* CONTENIDO */}
                    <div className="flex flex-col text-white font-[neulis] p-5">
                        {/* ---------- NAVBAR CON SCROLL ANIMADO ---------- */}
                        <div
                            className={`
                                fixed top-0 left-0 w-full bg-black rounded-b-[100px]
                                p-4 flex items-start z-40 transition-all duration-300
                                ${isSmall ? "h-[120px]" : "h-[250px]"}
                            `}
                        >
                            {/* ICONOS */}
                            <div
                                className={`
        absolute left-4 transition-all duration-300
        ${isSmall ? "top-3" : "top-4 mt-10"}
    `}
                            >
                                <button onClick={() => setSettingsOpen(true)}>
                                    <Settings size={isSmall ? 0 : 20} color="#C8F442" />
                                </button>
                            </div>

                            <div
                                className={`
        absolute right-4 transition-all duration-300
        ${isSmall ? "top-3" : "top-4 mt-10"}
    `}
                            >
                                <button onClick={handleLogout}>
                                    <LogOut size={isSmall ? 0 : 20} color="#C8F442" />
                                </button>
                            </div>
                            {/* FOTO */}
                            <img
                                src={profileStats?.profilePic || defaultProfilePic}
                                className={`
                                    rounded-full object-cover mr-4 ml-6 transition-all duration-300
                                    ${isSmall ? "w-[15vw] h-[15vw] mt-3" : "w-[22vw] h-[22vw] mt-22"}
                                `}
                            />

                            <div className="flex flex-col mt-1">
                                {/* USERNAME */}
                                <p
                                    className={`
                                    font-semibold text-center mr-18 text-[#C8F442] transition-all duration-300
                                    ${isSmall ? "text-[4vw] mt-7 mb-1" : "text-[5.5vw] mt-8 mb-4"}
                                `}
                                >
                                    {loading ? "Loading..." : profileStats?.username || currentUser.username}
                                </p>

                                {/* STATS */}
                                <div
                                    className={`
                                        flex transition-all duration-300
                                        ${isSmall ? "space-x-3 mt-1" : "space-x-5 mt-8"}
                                    `}
                                >
                                    <div className="text-center">
                                        <p className={`font-bold text-[#A480FF] transition-all duration-300 ${isSmall ? "text-[0vw]" : "text-[4vw]"}`}>{profileStats?.posts || 0}</p>
                                        <p className={`text-gray-300 transition-all duration-300 ${isSmall ? "text-[0vw]" : "text-[3vw]"}`}>Posts</p>
                                    </div>
                                    <div className="text-center">
                                        <p className={`font-bold text-[#A480FF] transition-all duration-300 ${isSmall ? "text-[0vw]" : "text-[4vw]"}`}>{profileStats?.followers || 0}</p>
                                        <p className={`text-gray-300 transition-all duration-300 ${isSmall ? "text-[0vw]" : "text-[3vw]"}`}>Followers</p>
                                    </div>
                                    <div className="text-center">
                                        <p className={`font-bold text-[#A480FF] transition-all duration-300 ${isSmall ? "text-[0vw]" : "text-[4vw]"}`}>{profileStats?.workouts || 0}</p>
                                        <p className={`text-gray-300 transition-all duration-300 ${isSmall ? "text-[0vw]" : "text-[3vw]"}`}>Workouts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* POSTS RESPONSIVE */}
                        <div className="mt-[240px] mb-150">
                            {loading ? (
                                <Loading />
                            ) : userPosts.length > 0 ? (
                                <div className="mb-420 flex flex-col items-center max-h-[70vh] mt-4 px-2">
                                    {userPosts.map((post: Posttype) => (
                                        <PostCard key={post.id} post={post} currentUser={currentUser} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center justify-center text-gray-400 mt-10">
                                    <p className="text-lg">No posts yet</p>
                                    <p className="text-sm">Share your first workout!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {settingsOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box bg-[#1E1E1E] border border-[#C8F442] max-w-md">
                        <h3 className="font-bold text-xl mb-6 text-[#C8F442]">Edit Profile</h3>

                        <div className="space-y-4">
                            {/* FOTO PERFIL */}
                            <div className="flex flex-col items-center gap-3">
                                <img src={previewImage || currentUser.profile_pic || defaultProfilePic} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-2 border-[#C8F442]" />
                                <label className="btn btn-sm bg-[#C8F442] text-black hover:bg-[#A3C436] border-none cursor-pointer">
                                    Choose Photo
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                                </label>
                            </div>

                            {/* INPUTTTT*/}
                            <div>
                                <label className="label">
                                    <span className="label-text text-gray-300">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={currentUser.username || "Enter username"}
                                    className="input input-bordered w-full bg-[#2b2b2b] border-[#C8F442] text-white"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-ghost text-white"
                                onClick={() => {
                                    setSettingsOpen(false);
                                    setNewUsername("");
                                    setNewProfilePic(null);
                                    setPreviewImage(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button className="btn bg-[#C8F442] text-black hover:bg-[#A3C436] border-none" onClick={handleUpdateProfile}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}
