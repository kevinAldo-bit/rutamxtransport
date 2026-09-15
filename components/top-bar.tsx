'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Search, Bell, Calendar, ChevronDown, Truck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ALERTS, TRUCKS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function TopBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const unread = ALERTS.filter((a) => !a.read).length

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return TRUCKS.filter(
      (t) =>
        t.placa.toLowerCase().includes(q) ||
        t.economico.toLowerCase().includes(q) ||
        t.driver.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    ).slice(0, 5)
  }, [query])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="lg:hidden">
        <Link href="/" className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Truck className="size-5" />
        </Link>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Buscar por placa, conductor o folio..."
          className="h-10 border-border bg-secondary/40 pl-9"
        />
        {open && results.length > 0 && (
          <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
            {results.map((t) => (
              <button
                key={t.id}
                onMouseDown={() => router.push(`/camiones/${t.id}`)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-secondary/60"
              >
                <div className="grid size-8 place-items-center rounded-md bg-secondary text-primary">
                  <Truck className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {t.economico} · {t.placa}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.driver.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <button className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">
          <Calendar className="size-4" />
          <span>15 Sep 2026</span>
          <ChevronDown className="size-3.5" />
        </button>

        <Link
          href="/alertas"
          className="relative grid size-10 place-items-center rounded-lg border border-border bg-secondary/40 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Alertas"
        >
          <Bell className="size-4.5" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 py-1 pl-1 pr-2 transition-colors hover:bg-secondary/70">
            <Avatar className="size-8">
              <AvatarImage src="/drivers/driver-1.png" alt="" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-xs font-semibold text-foreground">Óscar Morales</p>
              <p className="text-[11px] text-muted-foreground">Coordinador</p>
            </div>
            <ChevronDown className={cn('size-3.5 text-muted-foreground')} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferencias</DropdownMenuItem>
            <DropdownMenuItem>Centro de ayuda</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
