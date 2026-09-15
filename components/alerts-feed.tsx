'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Gauge,
  OctagonX,
  Navigation,
  MapPin,
  Check,
  CheckCheck,
  type LucideIcon,
} from 'lucide-react'
import { ALERTS, TRUCKS, type Alert, type AlertType } from '@/lib/data'
import { cn } from '@/lib/utils'

const ICONS: Record<AlertType, LucideIcon> = {
  velocidad: Gauge,
  detenido: OctagonX,
  desvio: Navigation,
  llegada: MapPin,
}

const SEVERITY: Record<string, { chip: string; icon: string; label: string }> = {
  alta: { chip: 'border-destructive/30 bg-destructive/10 text-destructive', icon: 'bg-destructive/10 text-destructive', label: 'Alta' },
  media: { chip: 'border-amber-500/30 bg-amber-500/10 text-amber-400', icon: 'bg-amber-500/10 text-amber-400', label: 'Media' },
  baja: { chip: 'border-primary/30 bg-primary/10 text-primary', icon: 'bg-primary/10 text-primary', label: 'Baja' },
}

const FILTERS = [
  { key: 'todas', label: 'Todas' },
  { key: 'no-leidas', label: 'No leídas' },
  { key: 'alta', label: 'Prioridad alta' },
] as const

type FilterKey = (typeof FILTERS)[number]['key']

export function AlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS)
  const [filter, setFilter] = useState<FilterKey>('todas')

  const truckId = (economico: string) =>
    TRUCKS.find((t) => t.economico === economico)?.id

  const filtered = useMemo(() => {
    if (filter === 'no-leidas') return alerts.filter((a) => !a.read)
    if (filter === 'alta') return alerts.filter((a) => a.severity === 'alta')
    return alerts
  }, [alerts, filter])

  const markRead = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)))

  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))

  const unread = alerts.filter((a) => !a.read).length

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={markAllRead}
          disabled={unread === 0}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck className="size-4" />
          Marcar todas como leídas
        </button>
      </div>

      <div className="divide-y divide-border">
        {filtered.map((a) => {
          const Icon = ICONS[a.type]
          const sev = SEVERITY[a.severity]
          const id = truckId(a.truck)
          return (
            <div
              key={a.id}
              className={cn(
                'flex items-start gap-4 px-5 py-4 transition-colors',
                !a.read && 'bg-secondary/20',
              )}
            >
              <div className={cn('mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg', sev.icon)}>
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {id ? (
                    <Link href={`/camiones/${id}`} className="text-sm font-semibold text-foreground hover:text-primary">
                      {a.truck}
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">{a.truck}</span>
                  )}
                  <span className={cn('rounded-full border px-2 py-0.5 text-[11px] font-medium', sev.chip)}>
                    {sev.label}
                  </span>
                  {!a.read && <span className="size-1.5 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{a.message}</p>
                <p className="mt-1 text-xs text-muted-foreground/70">{a.time}</p>
              </div>
              {!a.read && (
                <button
                  onClick={() => markRead(a.id)}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Check className="size-3.5" />
                  <span className="hidden sm:inline">Marcar leída</span>
                </button>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            No hay alertas en esta categoría.
          </div>
        )}
      </div>
    </div>
  )
}
