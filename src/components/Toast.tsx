"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { Check, Copy, X, Share2, Link2, Info } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  icon?: "copy" | "share" | "check" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info", icon?: Toast["icon"]) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success", icon?: Toast["icon"]) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, icon: icon || (type === "success" ? "check" : type === "error" ? "error" : "info") }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-toastIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`
              flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl
              backdrop-blur-xl border
              min-w-[280px] max-w-[400px]
              transition-all duration-300
              ${toast.type === "success" 
                ? "bg-gradient-to-r from-[rgba(20,30,20,0.9)] to-[rgba(15,25,15,0.85)] border-green-500/25 shadow-[0_8px_40px_rgba(34,197,94,0.15),0_0_0_1px_rgba(34,197,94,0.1)]" 
                : toast.type === "error"
                ? "bg-gradient-to-r from-[rgba(30,20,20,0.9)] to-[rgba(25,15,15,0.85)] border-red-500/25 shadow-[0_8px_40px_rgba(220,38,38,0.15),0_0_0_1px_rgba(220,38,38,0.1)]"
                : "bg-gradient-to-r from-[rgba(20,20,35,0.9)] to-[rgba(15,15,30,0.85)] border-blue-500/25 shadow-[0_8px_40px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.1)]"
              }
            `}>
              {/* Icon */}
              <div className={`
                flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                ${toast.type === "success" 
                  ? "bg-green-500/15 border border-green-500/20" 
                  : toast.type === "error"
                  ? "bg-red-500/15 border border-red-500/20"
                  : "bg-blue-500/15 border border-blue-500/20"
                }
              `}>
                {toast.icon === "copy" && <Copy className={`w-4 h-4 ${toast.type === "success" ? "text-green-400" : "text-blue-400"}`} />}
                {toast.icon === "share" && <Share2 className={`w-4 h-4 ${toast.type === "success" ? "text-green-400" : "text-blue-400"}`} />}
                {toast.icon === "check" && <Check className={`w-4 h-4 ${toast.type === "success" ? "text-green-400" : "text-blue-400"}`} />}
                {toast.icon === "error" && <X className={`w-4 h-4 text-red-400`} />}
                {toast.icon === "info" && <Info className={`w-4 h-4 text-blue-400`} />}
              </div>

              {/* Message */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 leading-snug">{toast.message}</p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300" />
              </button>

              {/* Auto-dismiss progress bar */}
              <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full overflow-hidden bg-white/5">
                <div 
                  className={`h-full rounded-full animate-toastProgress ${
                    toast.type === "success" 
                      ? "bg-gradient-to-r from-green-500/60 to-green-400/40" 
                      : toast.type === "error"
                      ? "bg-gradient-to-r from-red-500/60 to-red-400/40"
                      : "bg-gradient-to-r from-blue-500/60 to-blue-400/40"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
