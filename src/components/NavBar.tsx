import { Home, Search, Dumbbell, User, Plus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";

import supabase from "../services/supabase/config";

export default function NavBar({ onCreateClick }: { onCreateClick?: () => void }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("user"); 
        navigate("/");
    };

    return (
        <div className="min-h-screen w-[300px] bg-[#121212] flex flex-col font-[neulis] text-white">
            <h1 className="text-[42px] font-bold text-[#CAD83B] px-6 pt-8 pb-2 pl-7">Trevo</h1>

            <ul className="menu p-4 pl-12 flex flex-col justify-center w-full divide-y divide-[#9872F0]">
                <li className="py-2">
                    <Link to="/auth/home" className="text-[16px] flex items-center gap-5 px-4 py-2 hover:bg-[#8D6BDE] rounded-lg transition">
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                </li>

                <li className="py-2">
                    <Link to="/auth/discover/instructors" className="text-[16px] flex items-center gap-5 px-4 py-2 hover:bg-[#8D6BDE] rounded-lg transition">
                        <Search size={20} />
                        <span>Discover</span>
                    </Link>
                </li>

                <li className="py-2">
                    <Link to="/auth/myworkouts" className="text-[16px] flex items-center gap-5 px-4 py-2 hover:bg-[#8D6BDE] rounded-lg transition">
                        <Dumbbell size={20} />
                        <span>My workouts</span>
                    </Link>
                </li>

                <li className="py-2">
                    <Link to="/auth/profile" className="text-[16px] flex items-center gap-5 px-4 py-2 hover:bg-[#8D6BDE] rounded-lg transition">
                        <User size={20} />
                        <span>Profile</span>
                    </Link>
                </li>

                <li className="py-2">
                    <button onClick={onCreateClick} className="text-[16px] flex items-center gap-5 px-4 py-2 hover:bg-[#8D6BDE] rounded-lg transition">
                        <Plus size={20} />
                        <span>Create</span>
                    </button>
                </li>
            </ul>

            <div className="flex flex-col ">
                <img src="/trevo/public/assets/homecharacter.png" alt="" className="w-[170px]" />
                <button className="flex items-center justify-center mt-16 gap-5 text-white hover:opacity-80 transition cursor-pointer" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}
