import { STATUS_META, type TruckStatus } from '@/lib/data'
import { cn } from '@/lib/utils'

export function StatusBadge({
  status,
  className,
}: {
  status: TruckStatus
  className?: string
}) {
  const meta = STATUS_META[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        className,
      )}
      style={{
        borderColor: `${meta.color}40`,
        backgroundColor: `${meta.color}1a`,
        color: meta.color,
      }}
    >
      <span
        className={cn('size-1.5 rounded-full', status !== 'entregado' && 'animate-pulse')}
        style={{ backgroundColor: meta.color }}
      />
      {meta.label}
    </span>
  )
}
