import { useState, useEffect, useRef } from 'react';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
}

const ImageWithSkeleton = ({ src, alt, className = "", loading = "lazy" }: ImageWithSkeletonProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Reset loading state when src changes
        setImageLoaded(false);

        // Check if image is already loaded (cached images)
        const checkImageLoaded = () => {
            if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
                setImageLoaded(true);
            }
        };

        // Check immediately
        checkImageLoaded();

        // Also check after a small delay in case the image loads very quickly
        const timeoutId = setTimeout(checkImageLoaded, 100);

        return () => clearTimeout(timeoutId);
    }, [src]);

    const handleLoad = () => {
        setImageLoaded(true);
    };

    const handleError = () => {
        // Even on error, hide skeleton to show broken image or placeholder
        setImageLoaded(true);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton - always rendered, visible when image not loaded */}
            <div className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'
                } z-10`} />

            {/* Image - overlays skeleton */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 relative ${imageLoaded ? 'opacity-100 z-20' : 'opacity-0 z-0'
                    }`}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};

export default ImageWithSkeleton;

