/**
 * Helper utility to manage local storage arrays (e.g. watchlist, bought movies, downloaded)
 */

export function getStoredItems(key: string): string[] {
  if (typeof window === "undefined") return []; // SSR safety
  try {
    const stored = localStorage.getItem(key) || "[]";
    return JSON.parse(stored) as string[];
  } catch (e) {
    return [];
  }
}

export function addStoredItem(key: string, id: string, prepend: boolean = false): string[] {
  if (typeof window === "undefined") return [];
  const items = getStoredItems(key);
  if (!items.includes(id)) {
    const newItems = prepend ? [id, ...items] : [...items, id];
    localStorage.setItem(key, JSON.stringify(newItems));
    return newItems;
  }
  return items;
}

export function removeStoredItem(key: string, id: string): string[] {
  if (typeof window === "undefined") return [];
  const items = getStoredItems(key);
  const newItems = items.filter(item => item !== id);
  localStorage.setItem(key, JSON.stringify(newItems));
  return newItems;
}

export function toggleStoredItem(key: string, id: string): { items: string[], isAdded: boolean } {
  const items = getStoredItems(key);
  const isAdded = items.includes(id);
  
  if (isAdded) {
    return { items: removeStoredItem(key, id), isAdded: false };
  } else {
    return { items: addStoredItem(key, id), isAdded: true };
  }
}
