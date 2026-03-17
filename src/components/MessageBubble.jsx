export default function MessageBubble({ role, content }) {
    const isUser = role === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed ${isUser
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                    : "bg-[#2f2f2f] text-gray-100 shadow-sm"
                }`}
            >
                {content === "" && !isUser ? (
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-4 bg-gray-400 animate-pulse rounded-full"></div>
                    </div>  
                ) : (
                    content
                )}
            </div>
        </div>
    );
}