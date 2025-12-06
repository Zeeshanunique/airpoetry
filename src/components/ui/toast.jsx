import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";

const ToastContext = React.createContext(null);

const TOAST_DURATION = 4000;

const toastVariants = {
  success: {
    icon: CheckCircle2,
    className: "bg-emerald-50 border-emerald-200 text-emerald-800",
    iconClass: "text-emerald-500",
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 border-red-200 text-red-800",
    iconClass: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-amber-50 border-amber-200 text-amber-800",
    iconClass: "text-amber-500",
  },
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-800",
    iconClass: "text-blue-500",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || TOAST_DURATION);

    return id;
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useMemo(
    () => ({
      success: (message, options = {}) =>
        addToast({ type: "success", message, ...options }),
      error: (message, options = {}) =>
        addToast({ type: "error", message, ...options }),
      warning: (message, options = {}) =>
        addToast({ type: "warning", message, ...options }),
      info: (message, options = {}) =>
        addToast({ type: "info", message, ...options }),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast, onClose }) {
  const variant = toastVariants[toast.type] || toastVariants.info;
  const Icon = variant.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm",
        variant.className
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", variant.iconClass)} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-semibold text-sm mb-0.5">{toast.title}</p>
        )}
        <p className="text-sm">{toast.message}</p>
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium underline underline-offset-2 hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { ToastContext };


