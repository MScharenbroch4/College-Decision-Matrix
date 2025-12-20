'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface InfoTooltipProps {
    content: string;
    className?: string;
}

export default function InfoTooltip({ content, className = '' }: InfoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Only render portal after mounting (client-side only)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate tooltip position when it becomes visible
    useEffect(() => {
        if (isVisible && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const tooltipWidth = 256; // w-64 = 16rem = 256px

            // Position below the button, centered
            let left = rect.left + rect.width / 2 - tooltipWidth / 2;
            let top = rect.bottom + 8; // 8px gap below button

            // Prevent going off left edge
            if (left < 8) left = 8;

            // Prevent going off right edge
            if (left + tooltipWidth > window.innerWidth - 8) {
                left = window.innerWidth - tooltipWidth - 8;
            }

            // If tooltip would go below viewport, show above instead
            const tooltipHeight = 120; // approximate height
            if (top + tooltipHeight > window.innerHeight - 8) {
                top = rect.top - tooltipHeight - 8;
            }

            setTooltipPosition({ top, left });
        }
    }, [isVisible]);

    // Handle click outside to dismiss (for mobile)
    useEffect(() => {
        if (!isVisible) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;

            // Don't close if clicking the button itself
            if (buttonRef.current?.contains(target)) return;

            // Don't close if clicking inside the tooltip
            if (tooltipRef.current?.contains(target)) return;

            setIsVisible(false);
        };

        // Add listeners with a small delay to avoid immediate closing
        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }, 10);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isVisible]);

    // Toggle for click/tap (mobile-friendly)
    const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(!isVisible);
    };

    // Hover handlers (desktop)
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const tooltip = isVisible && mounted ? createPortal(
        <div
            ref={tooltipRef}
            className="fixed z-[9999] w-64 p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl text-sm text-gray-200 leading-relaxed"
            style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
            }}
        >
            {content}
            {/* Arrow pointing up */}
            <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-800"
            />
        </div>,
        document.body
    ) : null;

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
                className={`w-5 h-5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-help ${className}`}
                aria-label="More information"
                aria-expanded={isVisible}
            >
                ?
            </button>
            {tooltip}
        </>
    );
}
