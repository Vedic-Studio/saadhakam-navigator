import type { ArticleImage } from "@/features/articles";
import { FeaturedImage } from "./FeaturedImage";

interface ArticleFeaturedImageProps {
    image: ArticleImage;
    className?: string;
    /** Set true when the image is above the fold (hero position) for LCP optimisation */
    priority?: boolean;
}

/** @deprecated Use FeaturedImage directly. Kept for backward compatibility. */
export function ArticleFeaturedImage(props: ArticleFeaturedImageProps) {
    return <FeaturedImage {...props} />;
}
