import Image from "next/image";

/**
 * Documentary photo: grayscale treatment (brand rule — all photography is
 * B&W), hairline border, small-caps caption. Lazy by default; pass
 * priority for above-the-fold placements only.
 */
export default function Photo({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full border border-rule grayscale"
      />
      {caption && (
        <figcaption className="mt-3 text-eyebrow uppercase text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
