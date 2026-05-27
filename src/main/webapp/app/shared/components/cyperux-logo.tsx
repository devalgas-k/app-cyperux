import { cn } from "@/shared/utils"

interface CyperuxLogoProps {
  className?: string
  width?: number
  height?: number
  showText?: boolean
}

export function CyperuxLogo({ 
  className, 
  width = 200, 
  height = 60,
  showText = true 
}: CyperuxLogoProps) {
  if (!showText) {
    // Icon only version
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 50 50" 
        width={width} 
        height={height}
        className={cn(className)}
      >
        <g transform="translate(5, 5)">
          {/* Bloc bas */}
          <polygon points="15,35 15,20 0,28 0,43" fill="#593196"/>
          <polygon points="15,20 30,12 45,20 30,28" fill="#17A2B8"/>
          <polygon points="30,28 45,20 45,35 30,43" fill="#A991D4"/>
          {/* Bloc IA (flottant) */}
          <polygon points="15,5 25,-1 35,5 25,11" fill="#17A2B8"/>
        </g>
      </svg>
    )
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 60" 
      width={width} 
      height={height}
      className={cn(className)}
    >
      <g transform="translate(20, 10)">
        {/* Bloc bas */}
        <polygon points="15,35 15,20 0,28 0,43" fill="#593196"/>
        <polygon points="15,20 30,12 45,20 30,28" fill="#17A2B8"/>
        <polygon points="30,28 45,20 45,35 30,43" fill="#A991D4"/>
        {/* Bloc IA (flottant) */}
        <polygon points="15,5 25,-1 35,5 25,11" fill="#17A2B8"/>
      </g>
      <text x="80" y="36" fontFamily="Inter, Roboto, sans-serif" fontSize="28" fontWeight="800" fill="#593196" letterSpacing="-0.5">
        Cyper<tspan fill="#17A2B8">ux</tspan>
      </text>
    </svg>
  )
}

export function CyperuxLogoIcon({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 50 50" 
      width={size} 
      height={size}
      className={cn(className)}
    >
      <g transform="translate(5, 5)">
        {/* Bloc bas */}
        <polygon points="15,35 15,20 0,28 0,43" fill="#593196"/>
        <polygon points="15,20 30,12 45,20 30,28" fill="#17A2B8"/>
        <polygon points="30,28 45,20 45,35 30,43" fill="#A991D4"/>
        {/* Bloc IA (flottant) */}
        <polygon points="15,5 25,-1 35,5 25,11" fill="#17A2B8"/>
      </g>
    </svg>
  )
}
