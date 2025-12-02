import * as React from "react";
import { motion } from "framer-motion";
import { Wind, Sparkles, BookOpen, Feather, Cloud } from "lucide-react";
import { cn } from "../../utils/cn";

// Loading messages that cycle through during poem generation
const POEM_LOADING_MESSAGES = [
  { text: "Gathering pollution data...", icon: Cloud },
  { text: "Analyzing environmental patterns...", icon: Wind },
  { text: "Infusing data with literary inspiration...", icon: BookOpen },
  { text: "Crafting your unique poem...", icon: Feather },
  { text: "Adding finishing touches...", icon: Sparkles },
];

const TRANSLATION_LOADING_MESSAGES = [
  { text: "Preparing translation...", icon: BookOpen },
  { text: "Preserving poetic essence...", icon: Sparkles },
  { text: "Translating your poem...", icon: Feather },
];

export function PoemLoadingState({ className }) {
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % POEM_LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = POEM_LOADING_MESSAGES[messageIndex];
  const Icon = currentMessage.icon;

  return (
    <motion.div
      className={cn(
        "flex flex-col justify-center items-center h-[400px] bg-gradient-to-b from-gray-50/50 to-white rounded-lg border border-gray-100/80",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated spinner with icon */}
      <div className="relative mb-6">
        <motion.div
          className="h-20 w-20 border-4 border-primary/20 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          key={messageIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-8 w-8 text-primary" />
        </motion.div>
      </div>

      {/* Loading message */}
      <motion.div
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="text-primary font-medium text-lg mb-2">
          {currentMessage.text}
        </div>
        <div className="text-sm text-gray-500 italic">
          This may take a few moments
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {POEM_LOADING_MESSAGES.map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              index <= messageIndex ? "bg-primary" : "bg-gray-300"
            )}
            animate={index === messageIndex ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
        <motion.div
          className="h-full bg-gradient-to-r from-primary/60 to-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((messageIndex + 1) / POEM_LOADING_MESSAGES.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export function TranslationLoadingState({ className }) {
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % TRANSLATION_LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = TRANSLATION_LOADING_MESSAGES[messageIndex];
  const Icon = currentMessage.icon;

  return (
    <motion.div
      className={cn("flex items-center gap-3 p-4", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Icon className="h-5 w-5 text-primary" />
      </motion.div>
      <motion.span
        key={messageIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-gray-600"
      >
        {currentMessage.text}
      </motion.span>
    </motion.div>
  );
}

export function ButtonLoadingSpinner({ className }) {
  return (
    <motion.div
      className={cn("h-5 w-5 border-2 border-current border-t-transparent rounded-full", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function SkeletonPulse({ className }) {
  return (
    <motion.div
      className={cn("bg-gray-200 rounded", className)}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}

export function PoemSkeleton() {
  return (
    <div className="space-y-3 p-8">
      <SkeletonPulse className="h-4 w-3/4" />
      <SkeletonPulse className="h-4 w-full" />
      <SkeletonPulse className="h-4 w-5/6" />
      <SkeletonPulse className="h-4 w-4/5" />
      <div className="h-4" />
      <SkeletonPulse className="h-4 w-full" />
      <SkeletonPulse className="h-4 w-3/4" />
      <SkeletonPulse className="h-4 w-5/6" />
      <SkeletonPulse className="h-4 w-2/3" />
    </div>
  );
}

