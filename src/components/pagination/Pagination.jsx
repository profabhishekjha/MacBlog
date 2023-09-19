"use client"
import React from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'
const Pagination = ({page,hasPrev,hasNext,cat}) => {
  const router=useRouter()
  return (
    <div className={styles.container}>
    <button
    disabled={!hasPrev}
      className={styles.button}
      onClick={()=>router.push(`?page=${page-1}&cat=${cat || ""}`)}
    >
      Previous
    </button>
    <button
     disabled={!hasNext}
       className={styles.button}
      onClick={()=>router.push(`?page=${page+1}&cat=${cat || ""}`)}
    >
      Next
    </button>
  </div>
  )
}

export default Pagination
