import Image from "next/image";
import type { ArticleImage } from "@/data/articles";

interface ArticleFeaturedImageProps {
    image: ArticleImage;
    className?: string;
    /** Set true when the image is above the fold (hero position) for LCP optimisation */
    priority?: boolean;
}

export function ArticleFeaturedImage({
    image,
    className = "",
    priority = false,
}: ArticleFeaturedImageProps) {
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
