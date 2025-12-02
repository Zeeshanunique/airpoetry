/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import { AlertCircle, RefreshCw, Home, Book } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-50 opacity-50"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/5 opacity-50"></div>
          </div>

          <div className="relative max-w-lg w-full">
            {/* Main card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-serif font-bold text-gray-900 text-center mb-3">
                Oops! Something went wrong
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                We apologize for the inconvenience. An unexpected error has occurred while 
                generating your poetry experience. Please try again.
              </p>

              {/* Error details (development only) */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mb-6 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 p-3 hover:bg-gray-100 transition-colors">
                    🐛 Error details (development only)
                  </summary>
                  <div className="p-3 border-t border-gray-200 text-xs overflow-auto max-h-48">
                    <p className="font-mono text-red-600 mb-2 break-all">
                      {this.state.error.toString()}
                    </p>
                    <pre className="whitespace-pre-wrap text-gray-600 text-xs">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload Page
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  <Home className="h-4 w-4" />
                  Go to Home
                </button>
              </div>

              {/* Footer note */}
              <p className="text-xs text-gray-400 text-center mt-6">
                If this problem persists, please{" "}
                <a href="/contacts" className="text-primary hover:underline">
                  contact us
                </a>
              </p>
            </div>

            {/* Branding */}
            <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
              <Book className="h-4 w-4" />
              <span className="text-sm">AI(R) Poetry Generator</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func,
};

export default ErrorBoundary;
