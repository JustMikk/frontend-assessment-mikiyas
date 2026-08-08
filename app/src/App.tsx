import { useCallback, useMemo, useState, type KeyboardEvent } from 'react'
import { generateOrders } from './data/generateOrders'
import { OrderPanel } from './components/OrderPanel'
import { OrderTable } from './components/OrderTable'
import { ALL_STATUSES, useUrlFilters } from './hooks/useUrlFilters'

const orders = generateOrders(5000)

function focusOrderRow(orderNumber: string) {
  const row = document.querySelector<HTMLElement>(
    `tr[data-order-number="${CSS.escape(orderNumber)}"]`,
  )
  row?.focus()
  row?.scrollIntoView({ block: 'nearest' })
}

function App() {
  const { query, statuses, selected, setQuery, toggleStatus, setSelected } =
    useUrlFilters()
  const [activeOrderNumber, setActiveOrderNumber] = useState('')

  const statusKey = statuses.join(',')

  const filtered = useMemo(() => {
    const statusSet = statusKey ? statusKey.split(',') : []
    return orders.filter((order) => {
      if (query && !order.orderNumber.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (statusSet.length > 0 && !statusSet.includes(order.status)) {
        return false
      }
      return true
    })
  }, [query, statusKey])

  const selectedOrder = useMemo(
    () =>
      selected
        ? (orders.find((order) => order.orderNumber === selected) ?? null)
        : null,
    [selected],
  )

  const activeInList = filtered.some((order) => order.orderNumber === activeOrderNumber)
  const active =
    (activeInList ? activeOrderNumber : null) ||
    (filtered.some((order) => order.orderNumber === selected) ? selected : null) ||
    filtered[0]?.orderNumber ||
    ''

  const openOrder = useCallback(
    (orderNumber: string) => {
      setActiveOrderNumber(orderNumber)
      setSelected(orderNumber)
    },
    [setSelected],
  )

  const onRowFocus = useCallback((orderNumber: string) => {
    setActiveOrderNumber(orderNumber)
  }, [])

  const closePanel = useCallback(() => {
    const orderNumber = selected
    setSelected(null)
    if (orderNumber) {
      setActiveOrderNumber(orderNumber)
      focusOrderRow(orderNumber)
    }
  }, [selected, setSelected])

  const handleListKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (filtered.length === 0) return

      const currentIndex = Math.max(
        0,
        filtered.findIndex((order) => order.orderNumber === active),
      )

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const delta = event.key === 'ArrowDown' ? 1 : -1
        const nextIndex = Math.min(
          filtered.length - 1,
          Math.max(0, currentIndex + delta),
        )
        const nextOrderNumber = filtered[nextIndex]!.orderNumber
        setActiveOrderNumber(nextOrderNumber)
        focusOrderRow(nextOrderNumber)
        return
      }

      if (event.key === 'Enter' && active) {
        event.preventDefault()
        openOrder(active)
        return
      }

      if (event.key === 'Escape' && selected) {
        event.preventDefault()
        closePanel()
      }
    },
    [filtered, active, openOrder, selected, closePanel],
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1>Orders</h1>
        <p className="app-meta" aria-live="polite">
          Showing {filtered.length.toLocaleString()} of{' '}
          {orders.length.toLocaleString()} orders
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
      <div className="app-body" onKeyDown={handleListKeyDown}>
        <main className="app-main">
          <OrderTable
            orders={filtered}
            activeOrderNumber={active}
            selectedOrderNumber={selected}
            onRowClick={openOrder}
            onRowFocus={onRowFocus}
          />
        </main>
        {selectedOrder ? (
          <OrderPanel order={selectedOrder} onClose={closePanel} />
        ) : null}
      </div>
    </div>
  )
}

export default App
