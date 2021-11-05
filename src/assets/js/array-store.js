import storage from 'good-storage'

function inertArray (arr, val, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    return
  }
  arr.unshift(val)
}

export function save (item, key, compare) {
  const items = storage.get(key, [])
  inertArray(items, item, compare)
  return items
}
