import { useState } from 'react';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
}

const ImageWithSkeleton = ({ src, alt, className = "", loading = "lazy" }: ImageWithSkeletonProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
            {!imageLoaded && (
                <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={loading}
                onLoad={() => setImageLoaded(true)}
            />
        </div>
    );
};

export default ImageWithSkeleton;

