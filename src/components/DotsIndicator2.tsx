type Props = {
    active: number;
};

export default function DotsIndicator({ active }: Props) {
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <div className={`rounded-full transition-all duration-500 ${active === 0 ? "w-9 h-3 bg-[#D6DE3E]" : "w-2 h-2 bg-gray-400/60"}`}></div>

            <div className={`rounded-full transition-all duration-500 ${active === 1 ? "w-9 h-3 bg-[#D6DE3E]" : "w-2 h-2 bg-gray-400/60"}`}></div>
        </div>
    );
}
