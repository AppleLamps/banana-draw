
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ImageDisplay } from './components/ImageDisplay';
import { generateSketch } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

type ViewMode = 'sketch' | 'sideBySide';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const NewPhotoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const ToggleSwitch: React.FC<{
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}> = ({ value, onChange }) => {
  const isSketch = value === 'sketch';
  return (
    <div className="relative flex w-40 items-center rounded-full bg-slate-200/70 p-1 shadow-inner backdrop-blur-sm" role="group" aria-label="View mode toggle">
      <div className={`absolute h-8 w-[calc(50%-4px)] rounded-full bg-sky-500 shadow-md transition-transform duration-300 ease-in-out ${isSketch ? 'translate-x-0.5' : 'translate-x-[calc(100%-1px)]'}`}></div>
      <button onClick={() => onChange('sketch')} className={`relative z-10 flex-1 py-1 text-sm font-semibold transition-colors duration-300 ${isSketch ? 'text-white' : 'text-slate-600'}`} aria-pressed={isSketch}>Sketch</button>
      <button onClick={() => onChange('sideBySide')} className={`relative z-10 flex-1 py-1 text-sm font-semibold transition-colors duration-300 ${!isSketch ? 'text-white' : 'text-slate-600'}`} aria-pressed={!isSketch}>Compare</button>
    </div>
  );
};


const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [sketchedImage, setSketchedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('sketch');
    const [fileName, setFileName] = useState<string>('sketch.png');
    const [loadingMessage, setLoadingMessage] = useState<string>('Warming up the virtual pencils...');

    const handleImageUpload = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);
        setSketchedImage(null);
        
        const originalFileName = file.name.substring(0, file.name.lastIndexOf('.'));
        setFileName(`${originalFileName}-sketch.png`);

        try {
            setLoadingMessage('Preparing your image...');
            const dataUrl = await fileToBase64(file);
            setOriginalImage(dataUrl);

            setLoadingMessage('Sketching your masterpiece...');
            const base64Data = dataUrl.split(',')[1];
            const sketchDataUrl = await generateSketch(base64Data, file.type);
            setSketchedImage(sketchDataUrl);
        } catch (err) {
            console.error(err);
            setError('Failed to generate sketch. Please try another image.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleReset = useCallback(() => {
        setOriginalImage(null);
        setSketchedImage(null);
        setError(null);
        setIsLoading(false);
        setViewMode('sketch');
    }, []);

    const handleDownload = useCallback(() => {
        if (!sketchedImage) return;
        const link = document.createElement('a');
        link.href = sketchedImage;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [sketchedImage, fileName]);

    const renderContent = () => {
        if (isLoading && !originalImage) {
            return <LoadingSpinner message={loadingMessage} />;
        }

        if (originalImage) {
            return (
                <>
                    <ImageDisplay
                        originalImage={originalImage}
                        sketchedImage={sketchedImage}
                        viewMode={viewMode}
                        isLoading={isLoading}
                        error={error}
                        loadingMessage={loadingMessage}
                    />
                    <div className="w-full max-w-lg mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
                        <ToggleSwitch value={viewMode} onChange={setViewMode} />
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 bg-sky-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                                disabled={!sketchedImage || isLoading}
                                aria-label="Download sketch"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                <span>Download</span>
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 bg-white text-slate-700 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-slate-100 border border-slate-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                                aria-label="Upload new photo"
                            >
                                <NewPhotoIcon className="w-5 h-5" />
                                New
                            </button>
                        </div>
                    </div>
                </>
            );
        }

        return <ImageUploader onImageUpload={handleImageUpload} error={error} />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-fuchsia-100 text-slate-800 antialiased">
            <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
                <Header />
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
