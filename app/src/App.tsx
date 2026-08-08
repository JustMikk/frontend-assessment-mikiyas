import { generateOrders } from './data/generateOrders'
import { OrderTable } from './components/OrderTable'

const orders = generateOrders(5000)

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Orders</h1>
        <p className="app-meta">{orders.length.toLocaleString()} orders</p>
      </header>
      <main className="app-main">
        <OrderTable orders={orders} />
      </main>
    </div>
  )
}

export default App
