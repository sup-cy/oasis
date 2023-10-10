import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkModaContext = createContext();
function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(false, "isDark");
  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDark]
  );
  function toggle() {
    setIsDark((isDark) => !isDark);
  }
  return (
    <DarkModaContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModaContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModaContext);
  if (context === undefined)
    throw new Error("Dark mode context was used outside of DarkModaPrivider");
  return context;
}
export { DarkModeProvider, useDarkMode };
