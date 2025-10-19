
import React, { useRef, useCallback, useState } from 'react';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    error: string | null;
}

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, error }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const validateAndUpload = (file: File): boolean => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            return false;
        }
        onImageUpload(file);
        return true;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            validateAndUpload(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick();
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        handleDrag(e);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, [handleDrag]);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        handleDrag(e);
        setIsDragging(false);
    }, [handleDrag]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        handleDrag(e);
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            validateAndUpload(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, [handleDrag]);

    return (
        <div className="w-full max-w-xl flex flex-col items-center">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
            />
            <div
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`w-full p-8 bg-white/60 backdrop-blur-sm border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg
                ${isDragging ? 'border-sky-500 border-solid bg-sky-50' : 'border-slate-300 hover:border-sky-400 hover:bg-white'}`}
            >
                <UploadIcon className="mx-auto h-16 w-16 text-slate-400 transition-colors duration-300" />
                <h3 className="mt-4 text-xl font-semibold text-slate-700">
                    {isDragging ? 'Drop your image here!' : 'Click or drag to upload'}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    PNG, JPG, or WEBP. High resolution recommended.
                </p>
            </div>
            {error && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md animate-fade-in" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};
