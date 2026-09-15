import { Truck, PackageCheck, Boxes, TriangleAlert, TrendingUp, TrendingDown } from 'lucide-react'
import { KPIS } from '@/lib/data'
import { cn } from '@/lib/utils'

const cards = [
  {
    label: 'Camiones activos',
    value: `${KPIS.activeTrucks.value}`,
    sub: `de ${KPIS.activeTrucks.total} unidades`,
    icon: Truck,
    trend: '+3 vs. ayer',
    up: true,
    accent: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Entregas hoy',
    value: `${KPIS.deliveriesToday.value}`,
    sub: `de ${KPIS.deliveriesToday.total} programadas`,
    icon: PackageCheck,
    trend: '72% completado',
    up: true,
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Cargas en tránsito',
    value: `${KPIS.loadsInTransit}`,
    sub: 'rutas activas',
    icon: Boxes,
    trend: '+2 esta mañana',
    up: true,
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    label: 'Alertas pendientes',
    value: `${KPIS.pendingAlerts}`,
    sub: 'requieren atención',
    icon: TriangleAlert,
    trend: '-1 vs. ayer',
    up: false,
    accent: 'text-destructive',
    bg: 'bg-destructive/10',
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-border/80"
        >
          <div className="flex items-start justify-between">
            <div className={cn('grid size-11 place-items-center rounded-lg', c.bg)}>
              <c.icon className={cn('size-5.5', c.accent)} />
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs font-medium',
                c.up ? 'text-primary' : 'text-destructive',
              )}
            >
              {c.up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {c.trend}
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{c.value}</p>
          <p className="mt-1 text-sm font-medium text-foreground/80">{c.label}</p>
          <p className="text-xs text-muted-foreground">{c.sub}</p>
        </div>
      ))}
    </div>
  )
}
