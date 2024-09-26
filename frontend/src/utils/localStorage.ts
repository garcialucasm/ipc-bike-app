export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? value : null;
}

export function deleteLocalStorage(key: string) {
  localStorage.removeItem(key);
}
