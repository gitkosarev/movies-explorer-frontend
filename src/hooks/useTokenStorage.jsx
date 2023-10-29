import React from "react";

// хук управления токеном в localStorage
export function useTokenStorage(name) {
  const [savedValue, setSavedValue] = React.useState(localStorage.getItem(name));

  const saveValue = (value) => {
    localStorage.setItem(name, value);
    setSavedValue(value);
  };

  const removeSavedValue = () => {
    localStorage.removeItem(name);
    setSavedValue(null);
  };

  return [savedValue, saveValue, removeSavedValue];
}