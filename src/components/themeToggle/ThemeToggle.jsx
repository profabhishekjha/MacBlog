"use client"
import React, { useContext } from 'react'
import styles from './themToggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemContext'

const ThemeToggle = () => {
 const{toggle,theme}=useContext(ThemeContext)
  return (
    <div className={styles.container} onClick={toggle} style={theme==="dark" ? {backgroundColor:"white"} : {backgroundColor:"black"}}>
      <Image src="/moon.png" alt='moon' width={14} height={14}/>
      <div className={styles.ball} style={theme==="dark" ? {left:1,background:"black"} : {right:1,background:"white"}}></div>
      <Image src="/sun.png" alt='moon' width={14} height={14}/>
    </div>
  )
}

export default ThemeToggle
