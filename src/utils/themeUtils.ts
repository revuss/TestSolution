import { useState, useEffect } from "react";

const toggleTheme = (dark: boolean): void => {
  const root = document.documentElement;
  if (dark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const useDarkMode = () => {
  const [dark, setDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("dark-mode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const handleThemeToggle = () => {
    setDark((prevDark) => {
      const newDark = !prevDark;
      localStorage.setItem("dark-mode", JSON.stringify(newDark));
      return newDark;
    });
  };

  useEffect(() => {
    toggleTheme(dark);
  }, [dark]);

  return {
    dark,
    handleThemeToggle,
  };
};

export { useDarkMode };
