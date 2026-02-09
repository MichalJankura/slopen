import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-6 max-w-lg">
            <h2 className="text-xl font-bold text-red-200 mb-4">Something went wrong</h2>
            <p className="text-red-300 mb-4">
              An error occurred while rendering the application.
            </p>
            {this.state.error && (
              <details className="text-sm text-red-400">
                <summary className="cursor-pointer mb-2">Error details</summary>
                <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
              </details>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;