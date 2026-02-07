import { cn } from "@/lib/utils";
import Aurora from "@/components/Aurora";

export const ParallaxWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("relative w-full overflow-x-hidden bg-[#020617]", className)}>
            {/* Aurora Background */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#00d2ff", "#3a7bd5", "#00d2ff"]}
                    amplitude={1.2}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};
