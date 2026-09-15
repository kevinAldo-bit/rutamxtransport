'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import L from 'leaflet'
import { CITIES, STATUS_META, type Truck } from '@/lib/data'

const truckSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>'

function truckIcon(color: string, pulse: string) {
  return L.divIcon({
    className: '',
    html: `<div class="truck-marker" style="background:${color};--pulse-color:${pulse}">${truckSvg}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

export default function FleetMap({
  trucks,
  activeId,
  height = '100%',
}: {
  trucks: Truck[]
  activeId?: string
  height?: string
}) {
  const router = useRouter()

  return (
    <MapContainer
      center={[23.5, -102]}
      zoom={5}
      minZoom={4}
      scrollWheelZoom
      style={{ height, width: '100%' }}
      zoomControl
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {trucks.map((t) => {
        const meta = STATUS_META[t.status]
        const origin = CITIES[t.originKey].coords
        const dest = CITIES[t.destKey].coords
        const dim = activeId && activeId !== t.id
        return (
          <Fragment key={t.id}>
            <Polyline
              positions={[origin, t.current]}
              pathOptions={{
                color: meta.color,
                weight: dim ? 1.5 : 3,
                opacity: dim ? 0.25 : 0.9,
              }}
            />
            <Polyline
              positions={[t.current, dest]}
              pathOptions={{
                color: meta.color,
                weight: dim ? 1 : 2,
                opacity: dim ? 0.15 : 0.4,
                dashArray: '6 8',
              }}
            />
            <Marker
              position={t.current}
              icon={truckIcon(meta.color, meta.pulse)}
              eventHandlers={{
                click: () => router.push(`/camiones/${t.id}`),
              }}
            >
              <Popup>
                <div className="min-w-44 space-y-1">
                  <p className="text-sm font-bold">
                    {t.economico} · {t.placa}
                  </p>
                  <p className="text-xs opacity-80">{t.driver.name}</p>
                  <p className="text-xs">
                    {CITIES[t.originKey].name} → {CITIES[t.destKey].name}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: meta.color }}>
                    {meta.label} · {t.speed} km/h
                  </p>
                </div>
              </Popup>
            </Marker>
          </Fragment>
        )
      })}
    </MapContainer>
  )
}
