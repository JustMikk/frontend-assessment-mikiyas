import { generateOrders } from './data/generateOrders'

const orders = generateOrders(5000)

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Orders</h1>
        <p className="app-meta">{orders.length.toLocaleString()} orders loaded</p>
      </header>
      <main className="app-main">{/* Order list */}</main>
    </div>
  )
}

export default App
