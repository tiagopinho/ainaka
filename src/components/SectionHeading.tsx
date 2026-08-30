interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <span className="mb-4 inline-block font-display text-xs font-semibold uppercase tracking-[0.35em] text-neon-cyan">{eyebrow}</span>
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">{title}</h2>
      {description && <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{description}</p>}
    </div>
  )
}

