/**
 * Display headline split one phrase per line, each line wrapped in an
 * overflow mask. GSAP animates the inner span from translateY(110%) to 0.
 */
export default function MaskedLines({
  lines,
  as: Tag = "h1",
  className = "",
}: {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line) => (
        <span key={line} className="mask-line">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
