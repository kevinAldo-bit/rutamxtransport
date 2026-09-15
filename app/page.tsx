import { Radio, Maximize2 } from 'lucide-react'
import { Shell } from '@/components/shell'
import { PageHeader } from '@/components/page-header'
import { KpiCards } from '@/components/kpi-cards'
import { FleetMapPanel } from '@/components/fleet-map-panel'
import { FleetList } from '@/components/fleet-list'
import { RecentAlerts } from '@/components/recent-alerts'
import { STATUS_META, TRUCKS, type TruckStatus } from '@/lib/data'

const legend = Object.entries(STATUS_META) as [
  TruckStatus,
  (typeof STATUS_META)[TruckStatus],
][]

export default function DashboardPage() {
  return (
    <Shell>
      <PageHeader
        title="Panel de control"
        description="Monitoreo en tiempo real de la flota a nivel nacional."
      >
        <span className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
          <Radio className="size-3.5 animate-pulse" />
          En vivo
        </span>
      </PageHeader>

      <KpiCards />

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Mapa de flota</h2>
              <p className="text-xs text-muted-foreground">
                Ubicación y rutas de las unidades activas
              </p>
            </div>
            <Maximize2 className="size-4 text-muted-foreground" />
          </div>
          <div className="h-[420px] w-full md:h-[520px]">
            <FleetMapPanel trucks={TRUCKS} />
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-3">
            {legend.map(([status, meta]) => (
              <span key={status} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                {meta.label}
              </span>
            ))}
          </div>
        </div>

        <div className="h-[520px] xl:h-auto">
          <FleetList />
        </div>
      </div>

      <div className="mt-6">
        <RecentAlerts />
      </div>
    </Shell>
  )
}
