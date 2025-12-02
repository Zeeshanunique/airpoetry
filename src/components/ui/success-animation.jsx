import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, PartyPopper } from "lucide-react";
import { cn } from "../../utils/cn";

// Confetti particles for celebration
function Confetti({ count = 20 }) {
  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${50 + (Math.random() - 0.5) * 40}%`,
            top: "50%",
          }}
          initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          animate={{
            y: [0, -100 - Math.random() * 100, 200],
            x: [(Math.random() - 0.5) * 200],
            opacity: [1, 1, 0],
            scale: [1, 1.5, 0.5],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 1.5 + Math.random() * 0.5,
            ease: "easeOut",
            delay: Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Success checkmark animation
export function SuccessCheckmark({ size = "md", className }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <motion.div
        className={cn(
          "rounded-full bg-emerald-100 flex items-center justify-center",
          sizes[size]
        )}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle2
            className={cn(
              "text-emerald-600",
              size === "sm" ? "h-5 w-5" : size === "md" ? "h-7 w-7" : "h-10 w-10"
            )}
          />
        </motion.div>
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-emerald-300",
          sizes[size]
        )}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
}

// Full success celebration component
export function SuccessCelebration({
  title = "Success!",
  message,
  showConfetti = true,
  onComplete,
  className,
}) {
  React.useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center justify-center p-8 text-center",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showConfetti && <Confetti />}
      
      <SuccessCheckmark size="lg" className="mb-4" />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2 justify-center">
          <Sparkles className="h-5 w-5 text-amber-500" />
          {title}
          <Sparkles className="h-5 w-5 text-amber-500" />
        </h3>
        {message && <p className="text-gray-600">{message}</p>}
      </motion.div>
    </motion.div>
  );
}

// Poem generated success
export function PoemGeneratedSuccess({ onContinue }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SuccessCelebration
        title="Poem Created!"
        message="Your AI-generated poem is ready"
        onComplete={onContinue}
      />
    </motion.div>
  );
}

// Download success animation
export function DownloadSuccessAnimation({ show }) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed bottom-20 right-4 z-50"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
    >
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-lg flex items-center gap-3">
        <SuccessCheckmark size="sm" />
        <div>
          <p className="font-medium text-emerald-800">Downloaded!</p>
          <p className="text-sm text-emerald-600">Poem saved to your device</p>
        </div>
      </div>
    </motion.div>
  );
}

// Copy success animation
export function CopySuccessAnimation({ show }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10"
    >
      <div className="flex items-center gap-2 text-emerald-600 font-medium">
        <CheckCircle2 className="h-5 w-5" />
        Copied to clipboard!
      </div>
    </motion.div>
  );
}

