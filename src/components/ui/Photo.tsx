import Image from "next/image";

/**
 * Documentary photo: grayscale treatment (brand rule — all photography is
 * B&W), hairline border, small-caps caption. Lazy by default; pass
 * priority for above-the-fold placements only.
 *
 * Two layouts:
 * - intrinsic (pass width/height): renders at the image's own ratio
 * - cropped (pass aspect, e.g. "aspect-[4/3]"): fills the box, object-cover
 */
export default function Photo({
  src,
  alt,
  caption,
  width,
  height,
  aspect,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {aspect ? (
        <div className={`relative overflow-hidden border border-rule ${aspect}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover grayscale"
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full border border-rule grayscale"
        />
      )}
      {caption && (
        <figcaption className="mt-3 text-eyebrow uppercase text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
