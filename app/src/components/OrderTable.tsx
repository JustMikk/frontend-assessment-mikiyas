import type { Order } from '../data/generateOrders'

type OrderTableProps = {
  orders: Order[]
  selectedOrderNumber: string
  onRowClick: (orderNumber: string) => void
}

export function OrderTable({
  orders,
  selectedOrderNumber,
  onRowClick,
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
          const isSelected = order.orderNumber === selectedOrderNumber
          return (
            <tr
              key={order.orderNumber}
              className={isSelected ? 'is-selected' : undefined}
              onClick={() => onRowClick(order.orderNumber)}
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
