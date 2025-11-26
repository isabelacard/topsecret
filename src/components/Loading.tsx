export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#9872F0] mb-4"></div>
            <p className="text-[#9872F0] text-2xl font-[neulis] animate-pulse">Loading...</p>
        </div>
    );
}
