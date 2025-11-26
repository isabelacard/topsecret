import type { workoutType } from "../types/workoutTypes";

export default function WorkoutCard({ workout }: { workout: workoutType }) {
    return (
        <div className="w-35 h-45 bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg text-white font-[poppins] cursor-pointer hover:scale-[1.02] transition-transform duration-300">
            <div className="relative">
                <img src={workout.image} alt="Pilates workout" className="w-full h-30 object-cover" />
            </div>

            <div className="ml-3 mb-2 mr-4 mt-2">
                <h2 className="font-medium text-[13px]">{workout.category}</h2>
                <p className="font-medium text-gray-400 text-[11px]">{workout.workouts} workouts</p>
            </div>
        </div>
    );
}
