import type { Order } from '../data/generateOrders'
import { OrderRow } from './OrderRow'

type OrderTableProps = {
  orders: Order[]
  activeOrderNumber: string
  selectedOrderNumber: string
  onRowClick: (orderNumber: string) => void
  onRowFocus: (orderNumber: string) => void
}

/** Presentational table shell. Row memoization lives on OrderRow, not here. */
export function OrderTable({
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
}
