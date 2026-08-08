import type { Order } from '../data/generateOrders'

type OrderPanelProps = {
  order: Order
  onClose: () => void
}

export function OrderPanel({ order, onClose }: OrderPanelProps) {
  return (
    <aside className="order-panel" aria-label="Order details">
      <div className="order-panel-header">
        <h2>Order details</h2>
        <button type="button" className="order-panel-close" onClick={onClose}>
          Close
        </button>
      </div>
      <dl className="order-panel-body">
        <div>
          <dt>Order number</dt>
          <dd>{order.orderNumber}</dd>
        </div>
        <div>
          <dt>Customer</dt>
          <dd>{order.customer}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{order.status}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{order.total.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{order.date}</dd>
        </div>
      </dl>
    </aside>
  )
}
