export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* PhumCine Logo Pulse Animation */}
      <div className="relative flex items-center gap-3">
        <img src="/PHUMCINE.png" alt="PhumCine Logo" className="h-16 md:h-24 w-auto object-contain animate-pulse" />
        <span className="text-3xl font-bold tracking-wider text-white">PHUMCINE</span>
      </div>
      
      <div className="mt-8 flex gap-2">
         <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
         <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
         <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );
}
