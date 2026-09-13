export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="72"
      height="16"
      viewBox="0 0 90 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Dryft07"
    >
      <text
        x="0"
        y="15"
        fontFamily="'Roboto Mono', monospace"
        fontWeight="700"
        fontStyle="italic"
        fontSize="17"
        fill="currentColor"
      >
        Dryft07
      </text>
    </svg>
  );
}
