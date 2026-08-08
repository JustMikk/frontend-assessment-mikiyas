import type { Order } from '../data/generateOrders'

type OrderTableProps = {
  orders: Order[]
  activeOrderNumber: string
  selectedOrderNumber: string
  onRowClick: (orderNumber: string) => void
  onRowFocus: (orderNumber: string) => void
}

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
        {orders.map((order) => {
          const isActive = order.orderNumber === activeOrderNumber
          const isSelected = order.orderNumber === selectedOrderNumber
          const className = [
            isActive ? 'is-active' : '',
            isSelected ? 'is-selected' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <tr
              key={order.orderNumber}
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
        })}
      </tbody>
    </table>
  )
}
