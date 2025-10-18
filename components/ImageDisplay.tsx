
import React, { useState, useEffect } from 'react';

type ViewMode = 'sketch' | 'sideBySide';

interface ImageDisplayProps {
    originalImage: string;
    sketchedImage: string;
    viewMode: ViewMode;
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

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, sketchedImage, viewMode }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => setIsMounted(true));
        return () => cancelAnimationFrame(timer);
    }, []);
    
    const isSideBySide = viewMode === 'sideBySide';

    return (
        <div className={`w-full max-w-6xl p-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`flex flex-col md:flex-row gap-2 transition-all duration-500 ease-in-out aspect-[1/1] md:aspect-[2/1]`}>
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isSideBySide ? 'w-full md:w-1/2 opacity-100' : 'w-full md:w-0 opacity-0'}`}>
                    <ImageCard src={originalImage} title="Original" isVisible={isSideBySide} />
                </div>
                <div className={`transition-all duration-700 ease-in-out ${isSideBySide ? 'w-full md:w-1/2' : 'w-full'}`}>
                    <ImageCard src={sketchedImage} title="Sketch" isVisible={true} />
                </div>
            </div>
        </div>
    );
};
