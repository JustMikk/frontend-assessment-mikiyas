import type { Order } from '../data/generateOrders'

type OrderTableProps = {
  orders: Order[]
}

export function OrderTable({ orders }: OrderTableProps) {
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
          <tr key={order.orderNumber}>
            <td>{order.orderNumber}</td>
            <td>{order.customer}</td>
            <td>{order.status}</td>
            <td>{order.total.toFixed(2)}</td>
            <td>{order.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
