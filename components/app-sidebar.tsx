'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Route,
  Bell,
  Truck,
  Users,
  BarChart3,
  Settings,
  LifeBuoy,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ALERTS } from '@/lib/data'

const mainNav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rutas', label: 'Rutas y Cargas', icon: Route },
  { href: '/alertas', label: 'Alertas', icon: Bell },
]

const fleetNav = [
  { href: '/', label: 'Flota', icon: Truck },
  { href: '/', label: 'Conductores', icon: Users },
  { href: '/', label: 'Reportes', icon: BarChart3 },
]

export function AppSidebar() {
  const pathname = usePathname()
  const unread = ALERTS.filter((a) => !a.read).length

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Truck className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight text-sidebar-foreground">
            Ruta<span className="text-primary">MX</span>
          </p>
          <p className="text-[11px] text-muted-foreground">Gestión de Flotas</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-5">
        <div className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Operación
          </p>
          {mainNav.map((item) => {
            const active = pathname === item.href
            const showBadge = item.href === '/alertas' && unread > 0
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <item.icon className="size-4.5" />
                <span className="flex-1">{item.label}</span>
                {showBadge && (
                  <span className="grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Gestión
          </p>
          {fleetNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="size-4.5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <Settings className="size-4.5" />
            <span>Configuración</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <LifeBuoy className="size-4.5" />
            <span>Soporte</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
