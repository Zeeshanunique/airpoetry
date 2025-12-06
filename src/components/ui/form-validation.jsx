import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../../utils/cn";

// Validation error display
export function ValidationError({ message, className }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -5, height: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex items-center gap-1.5 mt-1.5 text-red-600", className)}
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="text-xs font-medium">{message}</span>
    </motion.div>
  );
}

// Success indicator
export function ValidationSuccess({ message, className }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className={cn("flex items-center gap-1.5 mt-1.5 text-emerald-600", className)}
    >
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="text-xs font-medium">{message}</span>
    </motion.div>
  );
}

// Help text
export function FieldHelpText({ children, className }) {
  return (
    <div className={cn("flex items-start gap-1.5 mt-1.5 text-gray-500", className)}>
      <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
      <span className="text-xs">{children}</span>
    </div>
  );
}

// Form field wrapper with validation
export function FormField({
  label,
  error,
  success,
  helpText,
  required,
  children,
  className,
}) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-gray-700 font-medium block text-sm">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          "transition-colors duration-200",
          hasError && "[&_input]:border-red-300 [&_input]:focus:border-red-500 [&_input]:focus:ring-red-200",
          hasSuccess && "[&_input]:border-emerald-300 [&_input]:focus:border-emerald-500"
        )}
      >
        {children}
      </div>
      <AnimatePresence mode="wait">
        {hasError && <ValidationError message={error} />}
        {hasSuccess && <ValidationSuccess message={success} />}
        {helpText && !hasError && !hasSuccess && (
          <FieldHelpText>{helpText}</FieldHelpText>
        )}
      </AnimatePresence>
    </div>
  );
}

// Date range validation hook
export function useDateRangeValidation(fromDate, toDate) {
  const [errors, setErrors] = React.useState({ from: "", to: "" });

  React.useEffect(() => {
    const newErrors = { from: "", to: "" };

    if (fromDate && toDate) {
      if (fromDate > toDate) {
        newErrors.from = "Start date must be before end date";
        newErrors.to = "End date must be after start date";
      }

      // Check if range is too large (more than 2 years)
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 730) {
        newErrors.to = "Date range cannot exceed 2 years";
      }
    }

    setErrors(newErrors);
  }, [fromDate, toDate]);

  const isValid = !errors.from && !errors.to;

  return { errors, isValid };
}

// Form validation hook
export function useFormValidation(initialState = {}) {
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const setFieldError = React.useCallback((field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setFieldTouched = React.useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const clearFieldError = React.useCallback((field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = React.useCallback(() => {
    setErrors({});
  }, []);

  const getFieldError = React.useCallback(
    (field) => (touched[field] ? errors[field] : undefined),
    [errors, touched]
  );

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    touched,
    setFieldError,
    setFieldTouched,
    clearFieldError,
    clearAllErrors,
    getFieldError,
    isValid,
  };
}

// Input with validation styling
export const ValidatedInput = React.forwardRef(
  ({ error, success, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full p-2 border rounded-md transition-colors duration-200",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : success
            ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200"
            : "border-gray-300 focus:border-primary focus:ring-primary/20",
          className
        )}
        {...props}
      />
    );
  }
);
ValidatedInput.displayName = "ValidatedInput";


