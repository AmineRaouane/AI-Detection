import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  isActive?: boolean
  onClick?: () => void
}

export function FeatureCard({
  title,
  description,
  isActive = false,
  onClick
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "bg-card/50 backdrop-blur-sm border-muted cursor-pointer transition-all duration-300",
        isActive && "border-primary shadow-lg scale-[1.02]"
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
