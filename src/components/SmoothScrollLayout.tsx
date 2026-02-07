import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

interface SmoothScrollLayoutProps {
    children: ReactNode;
}

export const SmoothScrollLayout = ({ children }: SmoothScrollLayoutProps) => {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    );
};
