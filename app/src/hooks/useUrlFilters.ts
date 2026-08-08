import { useSyncExternalStore } from 'react'
import type { OrderStatus } from '../data/generateOrders'

export const ALL_STATUSES: OrderStatus[] = ['NEW', 'PICKING', 'SHIPPED', 'CANCELLED']

const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  window.addEventListener('popstate', onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener('popstate', onStoreChange)
  }
}

function getSnapshot() {
  return window.location.search
}

function getServerSnapshot() {
  return ''
}

function writeSearch(params: URLSearchParams, mode: 'push' | 'replace') {
  const qs = params.toString()
  const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
  if (mode === 'push') window.history.pushState(null, '', url)
  else window.history.replaceState(null, '', url)
  listeners.forEach((listener) => listener())
}

function parseFilters(search: string) {
  const params = new URLSearchParams(search)
  const query = params.get('q') ?? ''
  const statuses = params
    .getAll('status')
    .filter((value): value is OrderStatus =>
      ALL_STATUSES.includes(value as OrderStatus),
    )
  return { query, statuses }
}

/** Filter state is the URL. No useEffect — subscribe via useSyncExternalStore. */
export function useUrlFilters() {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { query, statuses } = parseFilters(search)

  function setQuery(next: string) {
    const params = new URLSearchParams(window.location.search)
    if (next) params.set('q', next)
    else params.delete('q')
    writeSearch(params, 'replace')
  }

  function toggleStatus(status: OrderStatus) {
    const params = new URLSearchParams(window.location.search)
    const current = params.getAll('status')
    params.delete('status')
    const next = current.includes(status)
      ? current.filter((value) => value !== status)
      : [...current, status]
    for (const value of next) params.append('status', value)
    writeSearch(params, 'push')
  }

  return { query, statuses, setQuery, toggleStatus }
}
