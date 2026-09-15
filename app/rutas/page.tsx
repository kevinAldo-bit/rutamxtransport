import { Plus } from 'lucide-react'
import { Shell } from '@/components/shell'
import { PageHeader } from '@/components/page-header'
import { LoadsTable } from '@/components/loads-table'

export default function RutasPage() {
  return (
    <Shell>
      <PageHeader
        title="Rutas y Cargas"
        description="Administra las cargas asignadas y su estado de entrega."
      >
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          Nueva carga
        </button>
      </PageHeader>

      <LoadsTable />
    </Shell>
  )
}
