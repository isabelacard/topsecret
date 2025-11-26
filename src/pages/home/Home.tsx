import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import NavBar from "../../components/NavBar";
import PostCard from "../../components/PostCard";
import type { Posttype } from "../../types/postTypes";
import type { instructorType } from "../../types/instructorTypes";
import { getPosts } from "../../services/supabase/postService";
import InstructorCard from "../../components/InstructorCard";
import { getInstructors } from "../../services/supabase/instructorService";
import WorkoutCard from "../../components/WorkoutCard";
import NavBarResponsive from "../../components/NavBarResponsive";
import { getWorkouts } from "../../services/supabase/workoutService";
import type { workoutType } from "../../types/workoutTypes";
import CreatePost from "../../components/CreatePost";
import Alert from "../../components/Alert"; 
import authService from "../../services/supabase/authService";
import { getUserProfile, type UserProfile } from "../../services/supabase/userService";
import Loading from "../../components/Loading";

import ContainerHashtag from "./ContainerHashtag";

export default function Home() {
    // estados
    const [posts, setPosts] = useState<Posttype[]>([]);
    const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
    const matches = useMediaQuery("(min-width:600px)");
    const [instructors, setInstructors] = useState<instructorType[]>([]);
    const [workouts, setWorkouts] = useState<workoutType[]>([]);
    const [currentUser, setCurrentUser] = useState<UserProfile>(JSON.parse(localStorage.getItem("user") || "{}"));
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState(true);

    //hi, (user)
    useEffect(() => {
        const fetchUser = async () => {
            const authUser = await authService.getCurrentUser();
            if (authUser && authUser.email) {
                const userProfile = await getUserProfile(authUser.email);
                if (userProfile) {
                    setUsername(userProfile.username);
                    setCurrentUser(userProfile);
                    localStorage.setItem("user", JSON.stringify(userProfile));
                }
            }
        };
        fetchUser();
    }, []);

    // cargar posts
    const fetchPosts = async () => {
        const data = await getPosts();
        setPosts(data);
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchPosts();
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        const fetchInstructors = async () => {
            const data = await getInstructors();
            setInstructors(data);
        };
        fetchInstructors();
    }, []);

    // cargar ejercicios
    useEffect(() => {
        const fetchWorkouts = async () => {
            const data = await getWorkouts();
            setWorkouts(data);
        };
        fetchWorkouts();
    }, []);

    //seleccion de hashtag
    const handleHashtagClick = (hashtag: string) => {
        setSelectedHashtag((prevHashtag) => (prevHashtag === hashtag ? null : hashtag));
    };

    //filtrar posts
    const filteredPosts = selectedHashtag ? posts.filter((post) => post.hashtag === selectedHashtag) : posts;

    return (
        <div id="home-page" className={`min-h-screen m-0 p-0 flex ${matches ? "flex-row justify-center" : "flex-col items-center justify-center"} font-[neulis] bg-[#1E1E1E] text-white`}>
            {matches && (
                <div id="navbar" className="fixed top-0 left-0 h-full w-[330px]">
                    <NavBar onCreateClick={() => setModalOpen(true)} />
                </div>
            )}

            {!matches && (
                <div id="navbar-responsive" className="fixed bottom-0 left-0 w-full">
                    <NavBarResponsive onCreateClick={() => setModalOpen(true)}  />
                </div>
            )}

            {/* saludo y hashtags */}
            <div
                id="info"
                className={`fixed top-0 bg-[#1E1E1E] overflow-y-auto rounded-2xl p-4
    ${matches ? "left-[50%] transform -translate-x-1/2 max-w-[600px] w-full h-[200px] z-10" : "left-0 w-full px-4 pt-10 h-auto z-20"}`}
            >
                <div className={`flex ${matches ? "flex-row gap-8 justify-between items-center mt-10" : "flex-row mt-5 items-center justify-between"} mb-2`}>
                    <h1 className={`text-[#CAD83B] ${matches ? "text-[50px]" : "text-[35px] text-left"}`}>{loading ? "Loading..." : `Hi, ${username}`}</h1>
                    <Bell className={`${matches ? "absolute right-10 top-[50%] -translate-y-1/2" : "absolute right-9 top-[70px]"} `} color="white" size={matches ? 28 : 26} />
                </div>

                <div id="containers" className={`flex ${matches ? "flex-row gap-1" : "flex-wrap mt-9"}`}>
                    <ContainerHashtag text="#gym" onClick={() => handleHashtagClick("gym")} />
                    <ContainerHashtag text="#foodie" onClick={() => handleHashtagClick("foodie")} />
                    <ContainerHashtag text="#motivation" onClick={() => handleHashtagClick("motivation")} />
                    <ContainerHashtag text="#runnies" onClick={() => handleHashtagClick("runnies")} />
                </div>
            </div>

            {/* posts */}
            <div className={`${matches ? "ml-[320px] mt-[200px] w-[600px]" : "mt-[25vh] mb-[20vh] w-[90%] mx-auto"}`}>
                {loading ? (
                    <Loading />
                ) : (
                    filteredPosts.map((post: Posttype) => (
                        <PostCard key={post.id} post={post} currentUser={currentUser} />
                    ))
                )}
            </div>

            {matches && (
                <div className="mt-25 ml-8 mr-2" id="extra-info">
                    <p className="text-[#CAD83B] text-[17px] mb-1">Instructors</p>
                    <div className="flex gap-5 flex-col">
                        {instructors.slice(0, 2).map((instructor) => (
                            <InstructorCard key={instructor.id} instructor={instructor} />
                        ))}
                    </div>
                    <p className="text-[#CAD83B] text-[17px] mb-1 mt-7">Workouts</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {workouts.slice(0, 4).map((workout) => (
                            <WorkoutCard key={workout.id} workout={workout} />
                        ))}
                    </div>
                </div>
            )}
            <Alert />

            {/* modal de crear post */}
            {modalOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box bg-[#000000] border-white border-[0.1px]">
                        <CreatePost
                            onClose={() => setModalOpen(false)}
                            onPost={(newPost) => {
                                setPosts((prev) => [newPost, ...prev]);
                            }}
                            currentUser={currentUser} 
                        />
                    </div>
                </dialog>
            )}
        </div>
    );
}
