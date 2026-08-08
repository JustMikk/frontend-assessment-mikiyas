import { memo } from 'react'
import type { Order } from '../data/generateOrders'

type OrderRowProps = {
  order: Order
  isActive: boolean
  isSelected: boolean
  onRowClick: (orderNumber: string) => void
  onRowFocus: (orderNumber: string) => void
}

export const OrderRow = memo(function OrderRow({
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
})

type OrderTableProps = {
  orders: Order[]
  activeOrderNumber: string
  selectedOrderNumber: string
  onRowClick: (orderNumber: string) => void
  onRowFocus: (orderNumber: string) => void
}

export const OrderTable = memo(function OrderTable({
  orders,
  activeOrderNumber,
  selectedOrderNumber,
  onRowClick,
  onRowFocus,
}: OrderTableProps) {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order #</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow
            key={order.orderNumber}
            order={order}
            isActive={order.orderNumber === activeOrderNumber}
            isSelected={order.orderNumber === selectedOrderNumber}
            onRowClick={onRowClick}
            onRowFocus={onRowFocus}
          />
        ))}
      </tbody>
    </table>
  )
})
