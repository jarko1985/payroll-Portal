export const getFromLocalStorage = (key, fallbackValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : fallbackValue;
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
