interface LogoProps {
  className?: string
}

export const Logo = ({
  className,
}: LogoProps) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30 13C22.5 13 16 20 16 27C16 34 22.5 41 30 41C26 41 18 37 18 27C18 17 26 13 30 13Z"
        fill="currentColor"
      />
      <path
        d="M12 13L13.5 17.5L18 19L13.5 20.5L12 25L10.5 20.5L6 19L10.5 17.5L12 13Z"
        fill="currentColor"
      />
      <path
        d="M38 26L39.5 30.5L44 32L39.5 33.5L38 38L36.5 33.5L32 32L36.5 30.5L38 26Z"
        fill="currentColor"
      />
      <circle cx="10" cy="30" r="1.5" fill="currentColor" />
      <circle cx="35" cy="12" r="1.5" fill="currentColor" />
      <circle cx="20" cy="10" r="1.5" fill="currentColor" />
      <circle cx="42" cy="24" r="1.2" fill="currentColor" />
    </svg>
  )
}
