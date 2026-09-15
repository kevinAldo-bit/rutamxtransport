'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Truck as TruckIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  CITIES,
  LOADS,
  LOAD_STATUS_META,
  TRUCKS,
  type LoadStatus,
} from '@/lib/data'
import { cn } from '@/lib/utils'

const FILTERS: { key: LoadStatus | 'todas'; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'asignada', label: 'Asignadas' },
  { key: 'en-transito', label: 'En tránsito' },
  { key: 'entregada', label: 'Entregadas' },
]

function truckIdByEconomico(economico?: string) {
  return TRUCKS.find((t) => t.economico === economico)?.id
}

export function LoadsTable() {
  const [filter, setFilter] = useState<LoadStatus | 'todas'>('todas')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LOADS.filter((l) => {
      const matchesFilter = filter === 'todas' || l.status === filter
      const matchesQuery =
        !q ||
        l.folio.toLowerCase().includes(q) ||
        l.cargoType.toLowerCase().includes(q) ||
        (l.driver?.toLowerCase().includes(q) ?? false) ||
        CITIES[l.originKey].name.toLowerCase().includes(q) ||
        CITIES[l.destKey].name.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const count =
              f.key === 'todas'
                ? LOADS.length
                : LOADS.filter((l) => l.status === f.key).length
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  filter === f.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground',
                )}
              >
                {f.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-xs',
                    filter === f.key ? 'bg-primary-foreground/20' : 'bg-background/60',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar folio, ruta, cliente..."
            className="h-10 border-border bg-secondary/40 pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Folio</th>
              <th className="px-4 py-3 font-medium">Ruta</th>
              <th className="px-4 py-3 font-medium">Carga</th>
              <th className="px-4 py-3 font-medium">Entrega</th>
              <th className="px-4 py-3 font-medium">Unidad</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((l) => {
              const meta = LOAD_STATUS_META[l.status]
              const truckId = truckIdByEconomico(l.truck)
              return (
                <tr key={l.folio} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3.5 font-mono text-xs font-medium text-foreground">
                    {l.folio}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <span>{CITIES[l.originKey].name}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                      <span>{CITIES[l.destKey].name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-foreground">{l.cargoType}</p>
                    <p className="text-xs text-muted-foreground">{l.weight}</p>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{l.deliveryDate}</td>
                  <td className="px-4 py-3.5">
                    {l.truck ? (
                      <div>
                        <p className="text-foreground">{l.truck}</p>
                        <p className="text-xs text-muted-foreground">{l.driver}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                        meta.className,
                      )}
                    >
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    {truckId ? (
                      <Link
                        href={`/camiones/${truckId}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        <TruckIcon className="size-3.5" />
                        Rastrear
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No se encontraron cargas con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
