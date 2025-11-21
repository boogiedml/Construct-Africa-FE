import React, { useState } from "react";
import type { ReactNode } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface CarouselProps {
    children: ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
    const [active, setActive] = useState(0);
    const count = React.Children.count(children);

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

    // Calculate which cards to show
    // We want: prev card (stacked behind left), 3 main cards, next card (stacked behind right)
    const getCardIndices = () => {
        const indices = [];
        // Previous card (stacked behind)
        indices.push(getIndex(active - 2));
        // Three main visible cards
        indices.push(getIndex(active - 1));
        indices.push(active);
        indices.push(getIndex(active + 1));
        // Next card (stacked behind)
        indices.push(getIndex(active + 2));
        return indices;
    };

    const cardIndices = getCardIndices();

    return (
        <div className="relative w-full max-w-7xl mx-auto px-20">
            {/* LEFT BUTTON */}
            <button onClick={goPrev} className="swiper-button-prev-custom absolute left-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                <IoArrowBack size={20} className="text-gray-600" />
            </button>

            {/* CARDS CONTAINER */}
            <div className="relative w-full h-[400px] flex items-center justify-center">
                {React.Children.map(children, (child, i) => {
                    const indexInDisplay = cardIndices.indexOf(i);

                    // Only render cards that should be visible
                    if (indexInDisplay === -1) return null;

                    // Position mapping:
                    // 0: prev card (stacked behind left) - leftmost, behind
                    // 1: first main card - left
                    // 2: center main card - center
                    // 3: third main card - right
                    // 4: next card (stacked behind right) - rightmost, behind

                    let translateX: number;
                    let scale: number;
                    let zIndex: number;
                    let opacity: number;
                    let blur: string;

                    // Card width is 320px, so we'll use pixel-based positioning for better control
                    const cardWidth = 320;
                    const gap = 24; // Gap between main cards
                    const centerOffset = 0; // Center of container

                    if (indexInDisplay === 0) {
                        // Previous card stacked behind left - show only ~25% (80px) visible
                        // First main card left edge is at: -344 - 160 = -504px
                        // To show 80px, center should be at: -504 + 80 - 160 = -584px
                        translateX = centerOffset - (cardWidth * 2) - (gap * 2) + 280;
                        scale = 0.85;
                        zIndex = 1;
                        opacity = 1;
                        blur = 'blur(2px)';
                    } else if (indexInDisplay === 1) {
                        // First main card (left) - fully visible
                        translateX = centerOffset - cardWidth - gap;
                        scale = 1;
                        zIndex = 5;
                        opacity = 1;
                        blur = 'none';
                    } else if (indexInDisplay === 2) {
                        // Center main card - fully visible
                        translateX = centerOffset;
                        scale = 1;
                        zIndex = 10;
                        opacity = 1;
                        blur = 'none';
                    } else if (indexInDisplay === 3) {
                        // Third main card (right) - fully visible
                        translateX = centerOffset + cardWidth + gap;
                        scale = 1;
                        zIndex = 5;
                        opacity = 1;
                        blur = 'none';
                    } else {
                        // Next card stacked behind right - show only ~25% (80px) visible
                        // Third main card right edge is at: 344 + 160 = 504px
                        // To show 80px, center should be at: 504 - 80 + 160 = 584px
                        translateX = centerOffset + (cardWidth * 2) + (gap * 2) - 280;
                        scale = 0.85;
                        zIndex = 1;
                        opacity = 1;
                        blur = 'blur(2px)';
                    }

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
                                pointerEvents: indexInDisplay >= 1 && indexInDisplay <= 3 ? "auto" : "none",
                                width: `${cardWidth}px`,
                            }}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            {/* RIGHT BUTTON */}
            <button onClick={goNext} className="swiper-button-next-custom absolute right-[-80px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors hidden lg:block">
                <IoArrowForward size={20} className="text-gray-600" />
            </button>
        </div>
    );
};
