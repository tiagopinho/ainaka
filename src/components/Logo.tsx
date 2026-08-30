interface LogoProps {
  className?: string
  iconOnly?: boolean
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={iconOnly ? '/ainaka-symbol.png' : '/ainaka-logo-horizontal.png'}
        alt={iconOnly ? '' : 'AINAKA'}
        aria-hidden={iconOnly}
        className={iconOnly
          ? 'h-11 w-11 object-contain drop-shadow-[0_0_14px_rgba(53,230,255,.45)]'
          : 'h-12 w-auto max-w-[180px] object-contain drop-shadow-[0_0_14px_rgba(139,59,255,.35)]'}
      />
    </div>
  )
}
