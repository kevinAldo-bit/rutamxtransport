import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Phone,
  IdCard,
  Award,
  Package,
  Weight,
  Boxes,
  Building2,
  Gauge,
  Clock,
  MapPin,
} from 'lucide-react'
import { Shell } from '@/components/shell'
import { StatusBadge } from '@/components/status-badge'
import { FleetMapPanel } from '@/components/fleet-map-panel'
import { CITIES, TRUCKS, getTruck } from '@/lib/data'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return TRUCKS.map((t) => ({ id: t.id }))
}

export default async function TruckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const truck = getTruck(id)
  if (!truck) notFound()

  const origin = CITIES[truck.originKey]
  const dest = CITIES[truck.destKey]

  const cargoRows = [
    { icon: Package, label: 'Tipo de carga', value: truck.cargo.type },
    { icon: Weight, label: 'Peso', value: truck.cargo.weight },
    { icon: Boxes, label: 'Paquetes', value: `${truck.cargo.packages} unidades` },
    { icon: Building2, label: 'Cliente', value: truck.cargo.client },
  ]

  return (
    <Shell>
      <Link
        href="/rutas"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver a rutas
      </Link>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {truck.economico}
          </h1>
          <span className="rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-sm text-foreground">
            {truck.placa}
          </span>
          <StatusBadge status={truck.status} />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Gauge className="size-4" />
            {truck.speed} km/h
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-4" />
            {truck.eta}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Ubicación actual</h2>
              <p className="text-xs text-muted-foreground">
                {origin.name} → {dest.name}
              </p>
            </div>
            <div className="h-[340px] w-full">
              <FleetMapPanel trucks={TRUCKS} activeId={truck.id} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Progreso de ruta</h2>
              <span className="text-sm font-semibold text-primary">{truck.progress}%</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {origin.name}
              </span>
              <span className="inline-flex items-center gap-1">
                {dest.name}
                <MapPin className="size-3.5" />
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${truck.progress}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Historial de ruta</h2>
            <ol className="relative space-y-5 pl-2">
              {truck.timeline.map((ev, i) => {
                const last = i === truck.timeline.length - 1
                return (
                  <li key={i} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'z-10 grid size-4 place-items-center rounded-full border-2',
                          ev.status === 'done' && 'border-primary bg-primary',
                          ev.status === 'current' && 'border-primary bg-background',
                          ev.status === 'pending' && 'border-border bg-background',
                        )}
                      >
                        {ev.status === 'current' && (
                          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                        )}
                      </span>
                      {!last && (
                        <span
                          className={cn(
                            'w-0.5 flex-1',
                            ev.status === 'done' ? 'bg-primary' : 'bg-border',
                          )}
                        />
                      )}
                    </div>
                    <div className={cn('pb-1', last && 'pb-0')}>
                      <p className="text-sm font-medium text-foreground">{ev.label}</p>
                      <p className="text-xs text-muted-foreground">{ev.location}</p>
                      <p className="mt-0.5 text-xs font-medium text-muted-foreground/80">
                        {ev.time}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Conductor</h2>
            <div className="flex items-center gap-4">
              <Image
                src={truck.driver.photo || '/placeholder.svg'}
                alt={truck.driver.name}
                width={64}
                height={64}
                className="size-16 rounded-full border border-border object-cover"
              />
              <div>
                <p className="text-base font-semibold text-foreground">{truck.driver.name}</p>
                <p className="text-xs text-muted-foreground">Operador federal</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-foreground">{truck.driver.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <IdCard className="size-4 text-muted-foreground" />
                <span className="text-foreground">{truck.driver.license}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Award className="size-4 text-muted-foreground" />
                <span className="text-foreground">{truck.driver.experience} de experiencia</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Detalle de carga</h2>
            <div className="space-y-4">
              {cargoRows.map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-secondary/60">
                    <row.icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{row.label}</p>
                    <p className="text-sm font-medium text-foreground">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
