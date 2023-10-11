import React from "react";

// хук управления сохраненным поиском в localStorage
export function useSaveSearch(name) {
  const [savedValue, setSavedValue] = React.useState(JSON.parse(localStorage.getItem(name)));

  const saveValue = (value) => {
    localStorage.setItem(name, JSON.stringify(value));
    setSavedValue({ ...value });
  };

  const removeSavedValue = () => {
    localStorage.removeItem(name);
    setSavedValue(null);
  };

  return [savedValue, saveValue, removeSavedValue];
}