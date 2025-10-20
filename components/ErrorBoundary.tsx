import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    // FIX: Initializing state directly as a class property.
    // This is a modern approach that avoids potential `this` context issues
    // and resolves the type errors related to state, setState, and props.
    state: ErrorBoundaryState = {
        hasError: false,
        error: null
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null
        });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-fuchsia-100 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="text-red-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
                        <p className="text-slate-600 mb-6">
                            The application encountered an unexpected error. Please try refreshing the page.
                        </p>
                        {this.state.error && (
                            <details className="text-left mb-6 bg-slate-50 p-4 rounded-lg">
                                <summary className="cursor-pointer text-sm font-semibold text-slate-700 mb-2">
                                    Error Details
                                </summary>
                                <code className="text-xs text-red-600 block overflow-auto">
                                    {this.state.error.toString()}
                                </code>
                            </details>
                        )}
                        <button
                            onClick={this.handleReset}
                            className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
