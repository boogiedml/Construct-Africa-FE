import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface CarouselProps {
    children: ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
    const [active, setActive] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(3); // Default to desktop (3 slides)
    const count = React.Children.count(children);

    // Detect screen size and set slides per view
    useEffect(() => {
        const updateSlidesPerView = () => {
            const width = window.innerWidth;
            if (width < 768) {
                // Small screens: 1 slide
                setSlidesPerView(1);
            } else if (width < 1024) {
                // Medium screens: 2 slides
                setSlidesPerView(2);
            } else {
                // Large screens: 3 slides
                setSlidesPerView(3);
            }
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    // Get the index of a card with looping
    const getIndex = (index: number) => {
        if (index < 0) return count + index;
        if (index >= count) return index - count;
        return index;
    };

    // Navigate with looping
    const goNext = () => {
        setActive((prev) => (prev + 1) % count);
    };

    const goPrev = () => {
        setActive((prev) => (prev - 1 + count) % count);
    };

    // Calculate which cards to show based on slidesPerView
    const getCardIndices = () => {
        // If only one item, just return it
        if (count === 1) {
            return [0];
        }
        
        const indices = [];
        
        if (slidesPerView === 1) {
            // Small screens: 1 main card, with prev/next stacked behind
            indices.push(getIndex(active - 1)); // Previous (stacked behind)
            indices.push(active); // Main card
            indices.push(getIndex(active + 1)); // Next (stacked behind)
        } else if (slidesPerView === 2) {
            // Medium screens: 2 main cards, with prev/next stacked behind
            indices.push(getIndex(active - 1)); // Previous (stacked behind)
            indices.push(active); // First main card
            indices.push(getIndex(active + 1)); // Second main card
            indices.push(getIndex(active + 2)); // Next (stacked behind)
        } else {
            // Large screens: 3 main cards, with prev/next stacked behind
            indices.push(getIndex(active - 2)); // Previous (stacked behind)
            indices.push(getIndex(active - 1)); // First main card
            indices.push(active); // Center main card
            indices.push(getIndex(active + 1)); // Third main card
            indices.push(getIndex(active + 2)); // Next (stacked behind)
        }
        
        return indices;
    };

    const cardIndices = getCardIndices();

    // Calculate positioning based on slidesPerView
    const getCardPosition = (indexInDisplay: number) => {
        // Responsive card width based on screen size
        const cardWidth = slidesPerView === 1 ? 280 : slidesPerView === 2 ? 300 : 320;
        const gap = slidesPerView === 1 ? 16 : slidesPerView === 2 ? 20 : 24;
        const centerOffset = 0;
        
        let translateX: number;
        let scale: number;
        let zIndex: number;
        let opacity: number;
        let blur: string;
        let isMainCard: boolean;

        // Handle single item case
        if (count === 1) {
            if (slidesPerView === 1) {
                // Mobile: center the single item
                translateX = centerOffset;
            } else {
                // Tablet/Desktop: position on the left
                // For 2 slides per view, position at left of the two-card layout
                // For 3 slides per view, position at left of the three-card layout
                translateX = slidesPerView === 2 
                    ? centerOffset - (cardWidth / 2) - (gap / 2)
                    : centerOffset - cardWidth - gap;
            }
            scale = 1;
            zIndex = 10;
            opacity = 1;
            blur = 'none';
            isMainCard = true;
            return { translateX, scale, zIndex, opacity, blur, isMainCard, cardWidth };
        }

        if (slidesPerView === 1) {
            // Small screens: 1 main card
            if (indexInDisplay === 0) {
                // Previous card stacked behind
                translateX = centerOffset - cardWidth - gap + 240;
                scale = 0.85;
                zIndex = 1;
                opacity = 1;
                blur = 'blur(2px)';
                isMainCard = false;
            } else if (indexInDisplay === 1) {
                // Main card - center
                translateX = centerOffset;
                scale = 1;
                zIndex = 10;
                opacity = 1;
                blur = 'none';
                isMainCard = true;
            } else {
                // Next card stacked behind
                translateX = centerOffset + cardWidth + gap - 240;
                scale = 0.85;
                zIndex = 1;
                opacity = 1;
                blur = 'blur(2px)';
                isMainCard = false;
            }
        } else if (slidesPerView === 2) {
            // Medium screens: 2 main cards
            if (indexInDisplay === 0) {
                // Previous card stacked behind
                translateX = centerOffset - (cardWidth + gap) + 240;
                scale = 0.85;
                zIndex = 1;
                opacity = 1;
                blur = 'blur(2px)';
                isMainCard = false;
            } else if (indexInDisplay === 1) {
                // First main card (left)
                translateX = centerOffset - (cardWidth / 2) - (gap / 2);
                scale = 1;
                zIndex = 5;
                opacity = 1;
                blur = 'none';
                isMainCard = true;
            } else if (indexInDisplay === 2) {
                // Second main card (right)
                translateX = centerOffset + (cardWidth / 2) + (gap / 2);
                scale = 1;
                zIndex = 5;
                opacity = 1;
                blur = 'none';
                isMainCard = true;
            } else {
                // Next card stacked behind
                translateX = centerOffset + (cardWidth + gap) - 240;
                scale = 0.85;
                zIndex = 1;
                opacity = 1;
                blur = 'blur(2px)';
                isMainCard = false;
            }
        } else {
            // Large screens: 3 main cards (desktop - original logic)
            if (indexInDisplay === 0) {
                // Previous card stacked behind left
                translateX = centerOffset - (cardWidth * 2) - (gap * 2) + 280;
                scale = 0.85;
                zIndex = 1;
                opacity = 1;
                blur = 'blur(2px)';
                isMainCard = false;
            } else if (indexInDisplay === 1) {
                // First main card (left)
                translateX = centerOffset - cardWidth - gap;
                scale = 1;
                zIndex = 5;
                opacity = 1;
                blur = 'none';
                isMainCard = true;
            } else if (indexInDisplay === 2) {
                // Center main card
                translateX = centerOffset;
                scale = 1;
                zIndex = 10;
                opacity = 1;
                blur = 'none';
                isMainCard = true;
            } else if (indexInDisplay === 3) {
                // Third main card (right)
                translateX = centerOffset + cardWidth + gap;
                scale = 1;
                zIndex = 5;
                opacity = 1;
                blur = 'none';
                isMainCard = true;
            } else {
                // Next card stacked behind right
                translateX = centerOffset + (cardWidth * 2) + (gap * 2) - 280;
                scale = 0.85;
                zIndex = 1;
                opacity = 1;
                blur = 'blur(2px)';
                isMainCard = false;
            }
        }

        return { translateX, scale, zIndex, opacity, blur, isMainCard, cardWidth };
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
            {/* LEFT BUTTON - Hide when only one item */}
            {count > 1 && (
                <button 
                    onClick={goPrev} 
                    className="swiper-button-prev-custom absolute left-0 sm:left-[-20px] md:left-[-40px] lg:left-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-label="Previous slide"
                >
                    <IoArrowBack size={16} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
            )}

            {/* CARDS CONTAINER */}
            <div className="relative w-full h-[350px] sm:h-[380px] md:h-[400px] flex items-center justify-center overflow-visible">
                {React.Children.map(children, (child, i) => {
                    const indexInDisplay = cardIndices.indexOf(i);

                    // Only render cards that should be visible
                    if (indexInDisplay === -1) return null;

                    const { translateX, scale, zIndex, opacity, blur, isMainCard, cardWidth } = getCardPosition(indexInDisplay);

                    return (
                        <div
                            key={i}
                            className="absolute transition-all duration-500 ease-in-out"
                            style={{
                                left: '50%',
                                transform: `translateX(calc(${translateX}px - 50%)) scale(${scale})`,
                                zIndex: zIndex,
                                opacity: opacity,
                                filter: blur,
                                pointerEvents: isMainCard ? "auto" : "none",
                                width: `${cardWidth}px`,
                            }}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            {/* RIGHT BUTTON - Hide when only one item */}
            {count > 1 && (
                <button 
                    onClick={goNext} 
                    className="swiper-button-next-custom absolute right-0 sm:right-[-20px] md:right-[-40px] lg:right-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-label="Next slide"
                >
                    <IoArrowForward size={16} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
            )}
        </div>
    );
};
