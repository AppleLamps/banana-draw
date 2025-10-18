
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent">
                AI Photo Sketcher
            </h1>
            <p className="mt-3 text-lg text-slate-700 max-w-2xl mx-auto">
                Transform your photos into beautiful hand-drawn sketches instantly with the power of Gemini.
            </p>
        </header>
    );
};
