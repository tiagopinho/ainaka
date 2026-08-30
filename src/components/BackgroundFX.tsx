export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-neon-purple/40 animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-neon-blue/35 animate-drift blur-[100px]" />
      <div className="absolute bottom-[-160px] left-1/4 h-[480px] w-[480px] rounded-full bg-neon-pink/30 animate-pulse-glow blur-[110px]" style={{ animationDelay: "1.2s" }} />
      <div className="psychedelic-orb psychedelic-orb-one" />
      <div className="psychedelic-orb psychedelic-orb-two" />
      <div className="psychedelic-orb psychedelic-orb-three" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
      </div>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/40 to-void" />
    </div>
  )
}
