import { Home, Search, Dumbbell, User, Plus } from "lucide-react";
import { Link } from "react-router";

export default function NavBarResponsive({ onCreateClick }: { onCreateClick?: () => void }) {
    return (
        <div className="relative">
            <button 
                onClick={onCreateClick}
                className="absolute right-6 -top-42 w-17 h-17 rounded-full bg-[#CAD83B] text-black flex items-center justify-center shadow-lg z-10"
            >
                <Plus size={38} />
            </button>

            <nav className="fixed bottom-0 w-full bg-[#9872F0] h-22 flex justify-center gap-13 items-center rounded-t-[60px] shadow-lg">
                <Link to="/auth/home" className="text-white hover:opacity-80 transition">
                    <Home size={34} />
                </Link>
                
                <Link to="/auth/discover/instructors" className="text-white hover:opacity-80 transition">
                    <Search size={34} />
                </Link>
                
                <Link to="/auth/myworkouts" className="text-white hover:opacity-80 transition">
                    <Dumbbell size={34} />
                </Link>
                
                <Link to="/auth/profile" className="text-white hover:opacity-80 transition">
                    <User size={34} />
                </Link>
            </nav>
        </div>
    );
}