export type OrderStatus = 'NEW' | 'PICKING' | 'SHIPPED' | 'CANCELLED'

export type Order = {
  orderNumber: string
  customer: string
  status: OrderStatus
  total: number
  date: string
}

const STATUSES: OrderStatus[] = ['NEW', 'PICKING', 'SHIPPED', 'CANCELLED']

const FIRST_NAMES = [
  'Ava', 'Noah', 'Mia', 'Liam', 'Zoe', 'Eli', 'Nina', 'Omar', 'Iris', 'Kai',
  'Lea', 'Jon', 'Sara', 'Theo', 'Amir', 'Nora', 'Ruben', 'Hana', 'Luca', 'Maya',
]

const LAST_NAMES = [
  'Nguyen', 'Smith', 'Patel', 'Garcia', 'Kim', 'Brown', 'Ali', 'Martin', 'Costa', 'Chen',
  'Silva', 'Jones', 'Hassan', 'Lopez', 'Wright', 'Park', 'Diaz', 'Baker', 'Singh', 'Ross',
]

/** Deterministic PRNG (mulberry32) so the same seed always yields the same dataset. */
function createRng(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!
}

/**
 * Pure mock-order generator. Excluded from the assessment line-count budget.
 */
export function generateOrders(count = 5000, seed = 42): Order[] {
  const rng = createRng(seed)
  const orders: Order[] = new Array(count)

  for (let i = 0; i < count; i++) {
    const day = 1 + Math.floor(rng() * 28)
    const month = 1 + Math.floor(rng() * 12)
    const year = 2023 + Math.floor(rng() * 3)

    orders[i] = {
      orderNumber: `ORD-${String(i + 1).padStart(5, '0')}`,
      customer: `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_NAMES)}`,
      status: pick(rng, STATUSES),
      total: Math.round((10 + rng() * 990) * 100) / 100,
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    }
  }

  return orders
}
