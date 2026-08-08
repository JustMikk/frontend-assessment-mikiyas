import { useMemo, useRef } from 'react'
import type { Order } from '../data/generateOrders'

/**
 * Filters orders, but reuses the previous array reference when the resulting
 * item identities are unchanged (e.g. typing "o" still matches all ORD-* rows).
 * That lets the table skip reconciling 5,000 rows on no-op filter keystrokes.
 */
export function useFilteredOrders(
  allOrders: Order[],
  query: string,
  statusKey: string,
): Order[] {
  const prevRef = useRef(allOrders)

  const next = useMemo(() => {
    const statusSet = statusKey ? statusKey.split(',') : []
    if (!query && statusSet.length === 0) return allOrders

    return allOrders.filter((order) => {
      if (query && !order.orderNumber.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (statusSet.length > 0 && !statusSet.includes(order.status)) {
        return false
      }
      return true
    })
  }, [allOrders, query, statusKey])

  const prev = prevRef.current
  if (
    prev.length === next.length &&
    prev.every((order, index) => order === next[index])
  ) {
    return prev
  }

  prevRef.current = next
  return next
}
