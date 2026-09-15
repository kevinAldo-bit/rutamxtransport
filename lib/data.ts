export type TruckStatus = 'en-ruta' | 'detenido' | 'retrasado' | 'entregado'

export type LoadStatus = 'pendiente' | 'asignada' | 'en-transito' | 'entregada'

export type LatLng = [number, number]

export type City = {
  name: string
  coords: LatLng
}

export const CITIES: Record<string, City> = {
  cdmx: { name: 'Ciudad de México', coords: [19.4326, -99.1332] },
  monterrey: { name: 'Monterrey', coords: [25.6866, -100.3161] },
  guadalajara: { name: 'Guadalajara', coords: [20.6597, -103.3496] },
  tijuana: { name: 'Tijuana', coords: [32.5149, -117.0382] },
  puebla: { name: 'Puebla', coords: [19.0414, -98.2063] },
  queretaro: { name: 'Querétaro', coords: [20.5888, -100.3899] },
  leon: { name: 'León', coords: [21.1619, -101.6921] },
  veracruz: { name: 'Veracruz', coords: [19.1738, -96.1342] },
  merida: { name: 'Mérida', coords: [20.9674, -89.5926] },
  culiacan: { name: 'Culiacán', coords: [24.8091, -107.394] },
  chihuahua: { name: 'Chihuahua', coords: [28.6329, -106.0691] },
  cancun: { name: 'Cancún', coords: [21.1619, -86.8515] },
  hermosillo: { name: 'Hermosillo', coords: [29.0729, -110.9559] },
  saltillo: { name: 'Saltillo', coords: [25.4383, -100.9737] },
}

export type Driver = {
  name: string
  phone: string
  license: string
  photo: string
  experience: string
}

export type Cargo = {
  type: string
  weight: string
  packages: number
  client: string
}

export type TimelineEvent = {
  label: string
  location: string
  time: string
  status: 'done' | 'current' | 'pending'
}

export type Truck = {
  id: string
  economico: string
  placa: string
  driver: Driver
  originKey: string
  destKey: string
  current: LatLng
  cargo: Cargo
  progress: number
  speed: number
  status: TruckStatus
  eta: string
  timeline: TimelineEvent[]
}

function interpolate(a: LatLng, b: LatLng, t: number): LatLng {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

export const STATUS_META: Record<
  TruckStatus,
  { label: string; color: string; pulse: string; dot: string }
> = {
  'en-ruta': {
    label: 'En ruta',
    color: '#22c55e',
    pulse: 'rgba(34, 197, 94, 0.5)',
    dot: 'bg-[#22c55e]',
  },
  detenido: {
    label: 'Detenido',
    color: '#f97316',
    pulse: 'rgba(249, 115, 22, 0.5)',
    dot: 'bg-[#f97316]',
  },
  retrasado: {
    label: 'Retrasado',
    color: '#ef4444',
    pulse: 'rgba(239, 68, 68, 0.5)',
    dot: 'bg-[#ef4444]',
  },
  entregado: {
    label: 'Entregado',
    color: '#3b82f6',
    pulse: 'rgba(59, 130, 246, 0.5)',
    dot: 'bg-[#3b82f6]',
  },
}

export const LOAD_STATUS_META: Record<
  LoadStatus,
  { label: string; className: string }
> = {
  pendiente: {
    label: 'Pendiente',
    className: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  },
  asignada: {
    label: 'Asignada',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  'en-transito': {
    label: 'En tránsito',
    className: 'bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30',
  },
  entregada: {
    label: 'Entregada',
    className: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },
}

export const TRUCKS: Truck[] = [
  {
    id: 'TRK-001',
    economico: 'RM-104',
    placa: 'ABX-45-72',
    driver: {
      name: 'Javier Hernández',
      phone: '+52 55 1234 5678',
      license: 'Federal Tipo E',
      photo: '/drivers/driver-1.png',
      experience: '12 años',
    },
    originKey: 'cdmx',
    destKey: 'monterrey',
    current: interpolate(CITIES.cdmx.coords, CITIES.monterrey.coords, 0.55),
    cargo: {
      type: 'Electrónicos',
      weight: '18.5 ton',
      packages: 320,
      client: 'TechDistribuidora SA',
    },
    progress: 55,
    speed: 92,
    status: 'en-ruta',
    eta: 'Hoy, 18:40',
    timeline: [
      { label: 'Salida', location: 'CDMX — CEDIS Vallejo', time: 'Hoy, 06:00', status: 'done' },
      { label: 'Parada programada', location: 'Querétaro — Caseta', time: 'Hoy, 09:15', status: 'done' },
      { label: 'En tránsito', location: 'Saltillo — Autopista 57', time: 'Ahora', status: 'current' },
      { label: 'Llegada estimada', location: 'Monterrey — Bodega Norte', time: 'Hoy, 18:40', status: 'pending' },
    ],
  },
  {
    id: 'TRK-002',
    economico: 'RM-087',
    placa: 'JLK-12-09',
    driver: {
      name: 'María Fernanda Ruiz',
      phone: '+52 33 2345 6789',
      license: 'Federal Tipo E',
      photo: '/drivers/driver-2.png',
      experience: '8 años',
    },
    originKey: 'guadalajara',
    destKey: 'tijuana',
    current: interpolate(CITIES.guadalajara.coords, CITIES.tijuana.coords, 0.35),
    cargo: {
      type: 'Alimentos refrigerados',
      weight: '22.0 ton',
      packages: 540,
      client: 'FríoExpress',
    },
    progress: 35,
    speed: 0,
    status: 'detenido',
    eta: 'Mañana, 11:20',
    timeline: [
      { label: 'Salida', location: 'Guadalajara — CEDIS Sur', time: 'Ayer, 22:00', status: 'done' },
      { label: 'Parada — Descanso', location: 'Culiacán — Paradero', time: 'Ahora', status: 'current' },
      { label: 'Parada programada', location: 'Hermosillo — Caseta', time: 'Mañana, 05:00', status: 'pending' },
      { label: 'Llegada estimada', location: 'Tijuana — Cruce Otay', time: 'Mañana, 11:20', status: 'pending' },
    ],
  },
  {
    id: 'TRK-003',
    economico: 'RM-155',
    placa: 'PQR-88-33',
    driver: {
      name: 'Roberto Castañeda',
      phone: '+52 81 3456 7890',
      license: 'Federal Tipo E',
      photo: '/drivers/driver-3.png',
      experience: '15 años',
    },
    originKey: 'monterrey',
    destKey: 'chihuahua',
    current: interpolate(CITIES.monterrey.coords, CITIES.chihuahua.coords, 0.4),
    cargo: {
      type: 'Autopartes',
      weight: '16.2 ton',
      packages: 210,
      client: 'AutoPro México',
    },
    progress: 40,
    speed: 78,
    status: 'retrasado',
    eta: 'Hoy, 23:10 (+2h)',
    timeline: [
      { label: 'Salida', location: 'Monterrey — Planta Apodaca', time: 'Hoy, 04:30', status: 'done' },
      { label: 'Retraso por tráfico', location: 'Saltillo — Libramiento', time: 'Ahora', status: 'current' },
      { label: 'Parada programada', location: 'Torreón — Caseta', time: 'Hoy, 16:00', status: 'pending' },
      { label: 'Llegada estimada', location: 'Chihuahua — CEDIS', time: 'Hoy, 23:10', status: 'pending' },
    ],
  },
  {
    id: 'TRK-004',
    economico: 'RM-201',
    placa: 'MNO-55-14',
    driver: {
      name: 'Ana Gabriela Torres',
      phone: '+52 55 4567 8901',
      license: 'Federal Tipo E',
      photo: '/drivers/driver-4.png',
      experience: '6 años',
    },
    originKey: 'cdmx',
    destKey: 'veracruz',
    current: CITIES.veracruz.coords,
    cargo: {
      type: 'Materiales de construcción',
      weight: '25.0 ton',
      packages: 80,
      client: 'ConstruMax',
    },
    progress: 100,
    speed: 0,
    status: 'entregado',
    eta: 'Entregado 14:05',
    timeline: [
      { label: 'Salida', location: 'CDMX — CEDIS Oriente', time: 'Hoy, 05:00', status: 'done' },
      { label: 'Parada programada', location: 'Puebla — Caseta', time: 'Hoy, 07:20', status: 'done' },
      { label: 'Llegada', location: 'Veracruz — Puerto', time: 'Hoy, 14:05', status: 'done' },
      { label: 'Entrega confirmada', location: 'Veracruz — Bodega Cliente', time: 'Hoy, 14:05', status: 'done' },
    ],
  },
  {
    id: 'TRK-005',
    economico: 'RM-118',
    placa: 'STU-77-90',
    driver: {
      name: 'Luis Ángel Domínguez',
      phone: '+52 33 5678 9012',
      license: 'Federal Tipo E',
      photo: '/drivers/driver-5.png',
      experience: '10 años',
    },
    originKey: 'leon',
    destKey: 'cancun',
    current: interpolate(CITIES.leon.coords, CITIES.cancun.coords, 0.25),
    cargo: {
      type: 'Textiles',
      weight: '14.8 ton',
      packages: 460,
      client: 'ModaGlobal',
    },
    progress: 25,
    speed: 88,
    status: 'en-ruta',
    eta: 'Mañana, 20:00',
    timeline: [
      { label: 'Salida', location: 'León — CEDIS Bajío', time: 'Hoy, 03:00', status: 'done' },
      { label: 'En tránsito', location: 'Puebla — Autopista', time: 'Ahora', status: 'current' },
      { label: 'Parada programada', location: 'Villahermosa — Paradero', time: 'Mañana, 08:00', status: 'pending' },
      { label: 'Llegada estimada', location: 'Cancún — Zona Hotelera', time: 'Mañana, 20:00', status: 'pending' },
    ],
  },
  {
    id: 'TRK-006',
    economico: 'RM-093',
    placa: 'VWX-33-21',
    driver: {
      name: 'Carlos Mendoza',
      phone: '+52 81 6789 0123',
      license: 'Federal Tipo E',
      photo: '/drivers/driver-6.png',
      experience: '9 años',
    },
    originKey: 'queretaro',
    destKey: 'merida',
    current: interpolate(CITIES.queretaro.coords, CITIES.merida.coords, 0.6),
    cargo: {
      type: 'Maquinaria industrial',
      weight: '28.5 ton',
      packages: 45,
      client: 'IndustrialTec',
    },
    progress: 60,
    speed: 84,
    status: 'en-ruta',
    eta: 'Hoy, 21:30',
    timeline: [
      { label: 'Salida', location: 'Querétaro — Parque Industrial', time: 'Ayer, 20:00', status: 'done' },
      { label: 'Parada programada', location: 'Veracruz — Caseta', time: 'Hoy, 06:00', status: 'done' },
      { label: 'En tránsito', location: 'Campeche — Carretera', time: 'Ahora', status: 'current' },
      { label: 'Llegada estimada', location: 'Mérida — CEDIS Sureste', time: 'Hoy, 21:30', status: 'pending' },
    ],
  },
]

export type Load = {
  folio: string
  originKey: string
  destKey: string
  cargoType: string
  weight: string
  deliveryDate: string
  status: LoadStatus
  truck?: string
  driver?: string
}

export const LOADS: Load[] = [
  {
    folio: 'CG-2041',
    originKey: 'cdmx',
    destKey: 'monterrey',
    cargoType: 'Electrónicos',
    weight: '18.5 ton',
    deliveryDate: '15 Sep 2026',
    status: 'en-transito',
    truck: 'RM-104',
    driver: 'Javier Hernández',
  },
  {
    folio: 'CG-2042',
    originKey: 'guadalajara',
    destKey: 'tijuana',
    cargoType: 'Alimentos refrigerados',
    weight: '22.0 ton',
    deliveryDate: '16 Sep 2026',
    status: 'en-transito',
    truck: 'RM-087',
    driver: 'María Fernanda Ruiz',
  },
  {
    folio: 'CG-2043',
    originKey: 'monterrey',
    destKey: 'chihuahua',
    cargoType: 'Autopartes',
    weight: '16.2 ton',
    deliveryDate: '15 Sep 2026',
    status: 'asignada',
    truck: 'RM-155',
    driver: 'Roberto Castañeda',
  },
  {
    folio: 'CG-2044',
    originKey: 'puebla',
    destKey: 'saltillo',
    cargoType: 'Vidrio templado',
    weight: '19.0 ton',
    deliveryDate: '18 Sep 2026',
    status: 'pendiente',
  },
  {
    folio: 'CG-2045',
    originKey: 'leon',
    destKey: 'cancun',
    cargoType: 'Textiles',
    weight: '14.8 ton',
    deliveryDate: '17 Sep 2026',
    status: 'en-transito',
    truck: 'RM-118',
    driver: 'Luis Ángel Domínguez',
  },
  {
    folio: 'CG-2046',
    originKey: 'cdmx',
    destKey: 'veracruz',
    cargoType: 'Materiales de construcción',
    weight: '25.0 ton',
    deliveryDate: '15 Sep 2026',
    status: 'entregada',
    truck: 'RM-201',
    driver: 'Ana Gabriela Torres',
  },
  {
    folio: 'CG-2047',
    originKey: 'hermosillo',
    destKey: 'culiacan',
    cargoType: 'Productos agrícolas',
    weight: '20.4 ton',
    deliveryDate: '19 Sep 2026',
    status: 'pendiente',
  },
  {
    folio: 'CG-2048',
    originKey: 'queretaro',
    destKey: 'merida',
    cargoType: 'Maquinaria industrial',
    weight: '28.5 ton',
    deliveryDate: '15 Sep 2026',
    status: 'en-transito',
    truck: 'RM-093',
    driver: 'Carlos Mendoza',
  },
]

export type AlertType =
  | 'desvio'
  | 'velocidad'
  | 'detenido'
  | 'llegada'

export type Alert = {
  id: string
  type: AlertType
  truck: string
  message: string
  time: string
  read: boolean
  severity: 'alta' | 'media' | 'baja'
}

export const ALERTS: Alert[] = [
  {
    id: 'AL-01',
    type: 'velocidad',
    truck: 'RM-104',
    message: 'Exceso de velocidad detectado: 92 km/h en zona de 80 km/h',
    time: 'Hace 4 min',
    read: false,
    severity: 'media',
  },
  {
    id: 'AL-02',
    type: 'detenido',
    truck: 'RM-087',
    message: 'Unidad detenida por más de 45 min en Culiacán',
    time: 'Hace 12 min',
    read: false,
    severity: 'alta',
  },
  {
    id: 'AL-03',
    type: 'desvio',
    truck: 'RM-155',
    message: 'Desvío de ruta detectado cerca de Saltillo',
    time: 'Hace 28 min',
    read: false,
    severity: 'alta',
  },
  {
    id: 'AL-04',
    type: 'llegada',
    truck: 'RM-201',
    message: 'Llegada confirmada a destino: Veracruz — Puerto',
    time: 'Hace 1 h',
    read: true,
    severity: 'baja',
  },
  {
    id: 'AL-05',
    type: 'velocidad',
    truck: 'RM-093',
    message: 'Velocidad estable dentro de límites en carretera Campeche',
    time: 'Hace 2 h',
    read: true,
    severity: 'baja',
  },
]

export const KPIS = {
  activeTrucks: { value: 24, total: 30 },
  deliveriesToday: { value: 18, total: 25 },
  loadsInTransit: 12,
  pendingAlerts: 3,
}

export function getTruck(id: string): Truck | undefined {
  return TRUCKS.find((t) => t.id === id)
}
