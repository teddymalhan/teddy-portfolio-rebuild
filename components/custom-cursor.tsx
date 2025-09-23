"use client"

import gsap from "gsap"
import { useEffect } from "react"

const CustomCursor = () => {
    useEffect(() => {
        const cursorCustom = document.querySelector('.cursorCustom') as HTMLDivElement | null;
        const cursorFollower = document.querySelector('.follower') as HTMLDivElement | null;

        const moveCursor = (e: MouseEvent): void => {
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(cursorCustom, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        };

        const handleMouseEnter = (): void => {
            gsap.to(cursorCustom, {
                scale: 2,
                backgroundColor: "#3b82f6",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(cursorFollower, {
                scale: 1.5,
                borderColor: "#3b82f6",
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = (): void => {
            gsap.to(cursorCustom, {
                scale: 1,
                backgroundColor: "#ffffff",
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(cursorFollower, {
                scale: 1,
                borderColor: "#ffffff",
                duration: 0.3,
                ease: "power2.out"
            });
        };

        // Set initial position and properties
        gsap.set(cursorFollower, {
            xPercent: -50,
            yPercent: -50
        });

        gsap.set(cursorCustom, {
            xPercent: -50,
            yPercent: -50
        });

        // Add event listeners
        window.addEventListener('mousemove', moveCursor);

        // Add hover effects to text elements and interactive elements
        const hoverElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, .hover-target');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            hoverElements.forEach(element => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <div className="max-lg:hidden z-50">
            <div className="follower w-[50px] h-[50px] rounded-full bg-transparent border-white border-2 border-solid fixed z-50 mix-blend-difference pointer-events-none"></div>
            <div className="cursorCustom w-[10px] h-[10px] rounded-full bg-white fixed z-50 mix-blend-difference pointer-events-none"></div>
        </div>
    );
}

export default CustomCursor;