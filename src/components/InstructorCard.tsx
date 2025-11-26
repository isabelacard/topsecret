import { Star } from "lucide-react";

import type { instructorType } from "../types/instructorTypes";

export default function InstructorCard({ instructor }: { instructor: instructorType }) {
    return (
        <div className="bg-[#151515] h-min w-[300px] p-4 rounded-2xl shadow-2xl flex flex-row gap-2 items-center cursor-pointer hover:scale-[1.02] transition-transform duration-300">
            <div>
                <img
                    src={instructor.image}
                    alt={instructor.trainer}
                    className="w-[185px] h-[100px] rounded-full object-cover"
                />
            </div>

            <div className="font-[poppins] flex flex-col gap-1">
                <h1 className="text-[13px] font-medium">{instructor.trainer}</h1>
                <p className="text-[11px]">{instructor.price}</p>

                <div className="flex flex-row">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={15}
                            color={i < instructor.rating ? "#CAD83B" : "#555"}
                            fill={i < instructor.rating ? "#CAD83B" : "none"}
                        />
                    ))}
                </div>

                <p className="text-[9.5px]">{instructor.description}</p>
            </div>
        </div>
    );
}