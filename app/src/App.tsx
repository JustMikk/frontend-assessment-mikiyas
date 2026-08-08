import { generateOrders } from './data/generateOrders'
import { OrderTable } from './components/OrderTable'
import { ALL_STATUSES, useUrlFilters } from './hooks/useUrlFilters'

const orders = generateOrders(5000)

function App() {
  const { query, statuses, setQuery, toggleStatus } = useUrlFilters()

  const filtered = orders.filter((order) => {
    if (query && !order.orderNumber.toLowerCase().includes(query.toLowerCase())) {
      return false
    }
    if (statuses.length > 0 && !statuses.includes(order.status)) {
      return false
    }
    return true
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Orders</h1>
        <p className="app-meta">
          {filtered.length.toLocaleString()} of {orders.length.toLocaleString()} orders
        </p>
        <div className="filters">
          <label className="filter-search">
            <span className="filter-label">Order number</span>
            <input
              type="search"
              value={query}
              placeholder="Search order number"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <fieldset className="filter-status">
            <legend className="filter-label">Status</legend>
            {ALL_STATUSES.map((status) => (
              <label key={status} className="filter-chip">
                <input
                  type="checkbox"
                  checked={statuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                />
                {status}
              </label>
            ))}
          </fieldset>
        </div>
      </header>
      <main className="app-main">
        <OrderTable orders={filtered} />
      </main>
    </div>
  )
}

export default App
