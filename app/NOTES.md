# NOTES

## Constraints 1 and 2 together

Constraint 1 needs every filtered row in the DOM so Ctrl-P can paginate the full result. Constraint 2 forbids wasted row work while typing. Virtualization would make search feel fast but would print only the viewport, so it was rejected.

We render a plain HTML table of all filtered rows, hide chrome with `@media print`, and keep `overflow: visible`. For typing, each `OrderRow` is `React.memo`’d with stable `useCallback` handlers, and `useFilteredOrders` reuses the previous array reference when the filtered item identities are unchanged (e.g. `"o"` still matches every `ORD-*` row). That lets the table skip reconciling 5,000 rows on no-op keystrokes while still printing the full filtered set when membership does change.

**Gave up:** peak scroll performance and a sub-16ms cost on keystrokes that *do* change membership (those still reconcile a large list). Also gave up a dedicated table library.

**Library choice:** none. A native `<table>` is enough for printability, keyboard focus on `<tr>`, and the line budget; TanStack Table / react-window would fight Constraint 1 or add weight we do not need.

**`useEffect`:** none. URL state uses `useSyncExternalStore` plus History API notifications; focus returns from the Escape/Close handlers.

## Three decisions

1. **URL as source of truth (`q`, `status`, `selected`) via `useSyncExternalStore`, not React state mirrored with effects.**  
   *Rejected:* `useState` + `useEffect` syncing `searchParams`.  
   *Rejected would be correct if:* the brief allowed effects for URL sync and preferred that readability over a hard no-`useEffect` rule.

2. **Full DOM list + memo/stable filtered reference, not windowing.**  
   *Rejected:* `react-window` / virtualization.  
   *Rejected would be correct if:* printing only on-screen rows were acceptable, or print used a separate non-virtualized export path.

3. **Search updates with `history.replaceState`; status/selection use `pushState`.**  
   *Rejected:* `pushState` on every search keystroke.  
   *Rejected would be correct if:* reviewers required character-level Back-button undo for the query string.

## Not finished

- Own application TypeScript is still above the 300-line soft cap if counted strictly; further compression was not done.
- Profiler evidence is in `evidence/`; re-record after the latest memo/stable-list change if the checked-in export predates that commit.
