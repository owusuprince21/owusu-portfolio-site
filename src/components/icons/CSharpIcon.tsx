type TechIconProps = {
  size?: number
  className?: string
}

export function CSharpIcon({ size = 48, className = '' }: TechIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="C#"
    >
      <path
        fill="currentColor"
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.05 18.662c-2.761 0-5.001-2.24-5.001-5.002 0-2.761 2.24-5.001 5.001-5.001 1.332 0 2.543.52 3.444 1.365l-1.412 1.412a3.008 3.008 0 0 0-2.032-.788c-1.658 0-3.004 1.346-3.004 3.004s1.346 3.004 3.004 3.004c.788 0 1.506-.302 2.042-.788l1.402 1.412a4.988 4.988 0 0 1-3.444 1.365z"
      />
    </svg>
  )
}
