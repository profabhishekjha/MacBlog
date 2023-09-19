"use client"
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()



const handleStorage = () => {
    if (typeof window !== "undefined" && window.localStorage) {
        const value = localStorage.getItem("theme")
        return value || "light" 
    }

}
// but there is one more problem 
//as nextjs is SSR and we are accessing our browser localstorage
//so it will cause problem even if we hv given use client
//to solve this we use typeOf window.


export const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState()
  
    //but diqat is after we switched to dark mode
    //and refresh the page it will again be light mode
    //to solve this problem we use localStorage by creating a func handleStorage 
 const toggle=()=>{
    setTheme(theme==="light" ?"dark" :"light")
 }
 useEffect(()=>{
const value=handleStorage();
setTheme(value)
 },[])
useEffect(()=>{
localStorage.setItem("theme",theme)
},[theme])
    return (
        <ThemeContext.Provider value={{ theme,toggle}}>
            {children}
        </ThemeContext.Provider>
    )

}