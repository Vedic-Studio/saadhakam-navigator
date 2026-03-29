import Image from "next/image";
import type { ContentImage } from "@/types/images";

interface FeaturedImageProps {
    image: ContentImage;
    className?: string;
    /** Set true when the image is above the fold (hero position) for LCP optimisation */
    priority?: boolean;
}

export function FeaturedImage({
    image,
    className = "",
    priority = false,
}: FeaturedImageProps) {
    return (
        <figure className={`rounded-2xl overflow-hidden ${className}`}>
            <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={priority}
                className="w-full h-auto object-cover"
            />
        </figure>
    );
}
