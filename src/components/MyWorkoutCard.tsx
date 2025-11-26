import type { WorkoutType } from "../types/myworkoutsTypes";

interface WorkoutCardProps {
    workout: WorkoutType;
    onClick?: () => void;
}

export default function WorkoutCard({ workout, onClick }: WorkoutCardProps) {
    return (
        <div className=" border-b-1 border-gray-500 p-4 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform duration-300 group" onClick={onClick}>
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={workout.image} alt={workout.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-white text-[18px] font-medium mb-1 truncate">{workout.title}</h3>

                <p className="text-[#CAD83B] text-[14px] mb-2 font-medium">{workout.category}</p>

                <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-[13px]">{workout.duration}</span>
                    <span className="text-gray-400 text-[13px]">|</span>
                    <span className="text-gray-300 text-[13px]">{workout.level}</span>
                </div>
            </div>

            <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-[#CAD83B] transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
