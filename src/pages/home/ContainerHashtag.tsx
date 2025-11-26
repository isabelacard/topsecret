export default function ContainerHashtag({ text, onClick }: { text: string; onClick: () => void }) {
    return (
        <div className="inline-block mr-2 mb-2">
            <input className="btn p-[9px] sm:p-[15px] font-medium font-[neulis] rounded-4xl h-[30px] bg-white border-0 text-black" type="radio" aria-label={text} onClick={onClick} />
        </div>
    );
}
