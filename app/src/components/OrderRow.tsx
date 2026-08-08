import { memo } from 'react'
import type { Order } from '../data/generateOrders'

type OrderRowProps = {
  order: Order
  isActive: boolean
  isSelected: boolean
  onRowClick: (orderNumber: string) => void
  onRowFocus: (orderNumber: string) => void
}

function OrderRowComponent({
  order,
  isActive,
  isSelected,
  onRowClick,
  onRowFocus,
}: OrderRowProps) {
  const className = [
    isActive ? 'is-active' : '',
    isSelected ? 'is-selected' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <tr
      data-order-number={order.orderNumber}
      tabIndex={isActive ? 0 : -1}
      className={className || undefined}
      onClick={() => onRowClick(order.orderNumber)}
      onFocus={() => onRowFocus(order.orderNumber)}
    >
      <td>{order.orderNumber}</td>
      <td>{order.customer}</td>
      <td>{order.status}</td>
      <td>{order.total.toFixed(2)}</td>
      <td>{order.date}</td>
    </tr>
  )
}

/** Memoized row — skips render when order identity and flags are unchanged. */
export const OrderRow = memo(OrderRowComponent)
OrderRow.displayName = 'OrderRow'
