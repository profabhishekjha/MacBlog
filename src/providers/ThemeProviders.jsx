"use client"
import { ThemeContext } from '@/context/ThemContext'
import React, { useContext, useEffect, useState } from 'react'

const ThemeProviders = ({ children }) => {
    const { theme } = useContext(ThemeContext)
    const[mount,setMount]=useState(false)
    useEffect(()=>{
        setMount(true)
    },[])
    if(mount){
        return (
            <div className={theme}>
           {children}
            </div>
         )  

    }
      
    
   
}

export default ThemeProviders
