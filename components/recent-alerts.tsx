import Link from 'next/link'
import { Gauge, OctagonX, Navigation, MapPin, type LucideIcon } from 'lucide-react'
import { ALERTS, type AlertType } from '@/lib/data'
import { cn } from '@/lib/utils'

const ICONS: Record<AlertType, LucideIcon> = {
  velocidad: Gauge,
  detenido: OctagonX,
  desvio: Navigation,
  llegada: MapPin,
}

const SEVERITY: Record<string, string> = {
  alta: 'bg-destructive/10 text-destructive',
  media: 'bg-amber-500/10 text-amber-400',
  baja: 'bg-primary/10 text-primary',
}

export function RecentAlerts() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Alertas recientes</h2>
          <p className="text-xs text-muted-foreground">Últimos eventos de la flota</p>
        </div>
        <Link href="/alertas" className="text-xs font-medium text-primary hover:underline">
          Ver historial
        </Link>
      </div>
      <div className="divide-y divide-border">
        {ALERTS.slice(0, 4).map((a) => {
          const Icon = ICONS[a.type]
          return (
            <div key={a.id} className="flex items-start gap-3 px-5 py-3.5">
              <div className={cn('mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg', SEVERITY[a.severity])}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{a.truck}</p>
                  {!a.read && <span className="size-1.5 rounded-full bg-primary" />}
                </div>
                <p className="truncate text-xs text-muted-foreground">{a.message}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
