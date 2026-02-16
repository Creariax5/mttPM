"use client";
import Image from "next/image";

interface TokenLogoProps {
    logo?: string | null;
    symbol?: string | null;
    name?: string | null;
    size?: number;
    className?: string;
}

/**
 * Token logo component with first-letter fallback
 * Shows the token logo if available, otherwise shows a colored circle with the first letter
 */
export function TokenLogo({ logo, symbol, name, size = 20, className = "" }: TokenLogoProps) {
    const displayText = symbol ?? name ?? '?';
    const letter = displayText.charAt(0).toUpperCase();
    
    if (logo) {
        return (
            <Image
                src={logo}
                width={size}
                height={size}
                className={`rounded-full flex-shrink-0 ${className}`}
                alt={displayText}
            />
        );
    }
    
    return (
        <div 
            className={`rounded-full bg-success/30 flex items-center justify-center text-success font-bold flex-shrink-0 ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.5 }}
            title={displayText}
        >
            {letter}
        </div>
    );
}

export default TokenLogo;



