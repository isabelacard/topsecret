type Props = {
    active: number;
};

export default function DotsIndicator({ active }: Props) {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <div className={`h-2 rounded-full transition-all duration-500 ${active === 0 ? "w-9 h-3 bg-[#D6DE3E]" : "w-2 bg-gray-400/60"}`}></div>

            <div className={`h-2 rounded-full transition-all duration-500 ${active === 1 ? "w-6 bg-[#D6DE3E]" : "w-3 h-3 bg-gray-400/60"}`}></div>
        </div>
    );
}
