
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

type ViewMode = 'sketch' | 'sideBySide';

interface ImageDisplayProps {
    originalImage: string;
    sketchedImage: string | null;
    viewMode: ViewMode;
    isLoading: boolean;
    error: string | null;
    loadingMessage: string;
    aspectRatio: number | null;
}

const ImageCard: React.FC<{ src: string; title: string; isVisible: boolean }> = ({ src, title, isVisible }) => (
    <div className={`relative w-full h-full transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
            {title}
        </div>
        <img
            src={src}
            alt={title}
            className="w-full h-full object-contain rounded-xl"
        />
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, sketchedImage, viewMode, isLoading, error, loadingMessage, aspectRatio }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => setIsMounted(true));
        return () => cancelAnimationFrame(timer);
    }, []);
    
    const isSideBySide = viewMode === 'sideBySide';

    const renderSketchPanel = () => {
        if (isLoading) {
            return <LoadingSpinner message={loadingMessage} />;
        }
        if (error) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded-xl p-4">
                     <div className="text-red-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-red-700 font-semibold text-center">Oops! Something went wrong.</p>
                    <p className="text-red-600 text-sm text-center mt-1">{error}</p>
                </div>
            )
        }
        if (sketchedImage) {
            return <ImageCard src={sketchedImage} title="Sketch" isVisible={true} />;
        }
        return null;
    }

    const imageContainerStyle: React.CSSProperties = aspectRatio ? { aspectRatio: `${aspectRatio}` } : {};

    return (
        <div className={`w-full max-w-6xl p-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`flex flex-col md:flex-row items-center gap-2 transition-all duration-500 ease-in-out`}>
                <div 
                    className={`transition-all duration-700 ease-in-out overflow-hidden max-h-[80vh] ${isSideBySide ? 'w-full md:w-1/2' : 'w-0'}`}
                    style={imageContainerStyle}
                >
                    <ImageCard src={originalImage} title="Original" isVisible={isSideBySide} />
                </div>
                <div 
                    className={`transition-all duration-700 ease-in-out bg-slate-100/50 rounded-xl max-h-[80vh] ${isSideBySide ? 'w-full md:w-1/2' : 'w-full'}`}
                    style={imageContainerStyle}
                >
                   {renderSketchPanel()}
                </div>
            </div>
        </div>
    );
};
