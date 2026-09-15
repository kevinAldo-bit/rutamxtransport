'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import type { Truck } from '@/lib/data'

const FleetMap = dynamic(() => import('@/components/fleet-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0b1220]">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
        <p className="text-sm">Cargando mapa...</p>
      </div>
    </div>
  ),
})

export function FleetMapPanel({
  trucks,
  activeId,
  height = '100%',
}: {
  trucks: Truck[]
  activeId?: string
  height?: string
}) {
  return <FleetMap trucks={trucks} activeId={activeId} height={height} />
}
