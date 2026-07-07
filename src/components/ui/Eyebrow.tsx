export default function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`gsap-reveal text-eyebrow uppercase text-muted ${className}`}
    >
      {children}
    </p>
  );
}
