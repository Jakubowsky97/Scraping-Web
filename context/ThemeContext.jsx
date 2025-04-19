"use client"
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    const contextObj = {
        theme,
        toggleTheme
    };
    return (
        <ThemeContext.Provider value={contextObj}>
            {children}
        </ThemeContext.Provider>
    )
}