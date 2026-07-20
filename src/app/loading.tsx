export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* SabayFlix Logo Pulse Animation */}
      <div className="relative flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center transform rotate-12 animate-pulse shadow-lg shadow-primary/40">
          <div className="w-6 h-6 bg-white rounded-md transform -rotate-12 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
        <span className="text-3xl font-bold tracking-wider text-white">SABAYFLIX</span>
      </div>
      
      <div className="mt-8 flex gap-2">
         <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
         <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
         <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );
}
