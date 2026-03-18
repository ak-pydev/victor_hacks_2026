import { useState, useEffect } from 'react';

/**
 * Custom hook to preload a sequence of images.
 * @param frameCount The total number of frames to load.
 * @param getImagePath A function that returns the image path for a given frame index.
 * @returns An object containing the loaded images, the progress, and a loaded flag.
 */
export function useImagePreloader(frameCount: number, getImagePath: (index: number) => string) {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = new Array(frameCount);

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = getImagePath(i);
            img.onload = () => {
                loadedCount++;
                loadedImages[i] = img;
                setProgress((loadedCount / frameCount) * 100);

                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++; // Still increment to avoid getting stuck if an image fails
                console.error(`Failed to load image at index ${i}`);
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                }
            };
        }
    }, [frameCount, getImagePath]);

    return { images, progress, isLoaded };
}
