import Link from 'next/link'
import { ChevronRight, Gauge } from 'lucide-react'
import { CITIES, TRUCKS } from '@/lib/data'
import { StatusBadge } from '@/components/status-badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export function FleetList() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Unidades en operación</h2>
          <p className="text-xs text-muted-foreground">{TRUCKS.length} camiones monitoreados</p>
        </div>
        <Link href="/rutas" className="text-xs font-medium text-primary hover:underline">
          Ver todas
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {TRUCKS.map((t) => (
            <Link
              key={t.id}
              href={`/camiones/${t.id}`}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{t.economico}</p>
                  <span className="text-xs text-muted-foreground">{t.placa}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {CITIES[t.originKey].name} → {CITIES[t.destKey].name}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status={t.status} />
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Gauge className="size-3" />
                    {t.speed} km/h
                  </span>
                </div>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
