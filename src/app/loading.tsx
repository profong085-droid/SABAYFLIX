export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#060810] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, rgba(220,38,38,0.1) 30%, transparent 70%)',
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />
        {/* Floating orbs */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-red-500/30 rounded-full"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        />
        <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 bg-red-400/20 rounded-full"
          style={{ animation: 'float 5s ease-in-out infinite 1s' }}
        />
        <div className="absolute top-[30%] right-[30%] w-1 h-1 bg-white/10 rounded-full"
          style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}
        />
        <div className="absolute bottom-[25%] left-[25%] w-1.5 h-1.5 bg-red-500/15 rounded-full"
          style={{ animation: 'float 4.5s ease-in-out infinite 1.5s' }}
        />
        
        {/* Rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full border border-red-500/10 opacity-40"
          style={{ animation: 'spinSlow 20s linear infinite' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full border border-red-500/5 opacity-30"
          style={{ animation: 'spinSlow 30s linear infinite reverse' }}
        />
      </div>

      {/* Main Logo Area */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Outer glow behind logo */}
        <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-red-600/10 via-transparent to-red-600/10 blur-2xl pointer-events-none" />
        
        {/* Logo with glass container */}
        <div 
          className="relative px-10 py-8 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(20,20,30,0.6) 50%, rgba(220,38,38,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(220,38,38,0.12)',
            boxShadow: '0 0 60px rgba(220,38,38,0.08), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
            animation: 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div className="flex items-center gap-4">
            <img 
              src="/PHUMCINE.png" 
              alt="PhumCine Logo" 
              className="h-16 md:h-20 w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.25))',
              }}
            />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black tracking-[0.15em] text-white">
                PHUM<span className="text-red-500">CINE</span>
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-gray-500 uppercase mt-0.5">
                Premium Streaming
              </span>
            </div>
          </div>
        </div>

        {/* Animated loading bar */}
        <div className="mt-10 w-48 md:w-56 relative">
          {/* Track */}
          <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
            {/* Moving gradient bar */}
            <div 
              className="h-full rounded-full"
              style={{
                width: '40%',
                background: 'linear-gradient(90deg, transparent, #dc2626, #ef4444, #dc2626, transparent)',
                animation: 'loadingSlide 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Loading text with dot animation */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="text-[11px] text-gray-500 tracking-widest">កំពុងផ្ទុក</span>
          <span className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-red-500/60 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
            <span className="w-1 h-1 rounded-full bg-red-500/60 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1s' }} />
            <span className="w-1 h-1 rounded-full bg-red-500/60 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1s' }} />
          </span>
        </div>
      </div>

      {/* Inline keyframes for the loading bar slide */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loadingSlide {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(350%); }
          100% { transform: translateX(-150%); }
        }
      `}} />
    </div>
  );
}
