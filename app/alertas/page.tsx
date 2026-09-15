import { Shell } from '@/components/shell'
import { PageHeader } from '@/components/page-header'
import { AlertsFeed } from '@/components/alerts-feed'

export default function AlertasPage() {
  return (
    <Shell>
      <PageHeader
        title="Centro de alertas"
        description="Eventos de seguridad, desvíos y notificaciones de la flota."
      />
      <AlertsFeed />
    </Shell>
  )
}
