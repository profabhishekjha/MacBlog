// components/DeleteButton.js
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const DeleteButton = ({ postId }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deletePost/${postId}`, {
        method: 'POST'
      })

      if (response.ok) {
        router.push('/')
        console.log('Post deleted successfully: ', response)
      } else {
        console.error('Error deleting post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return null
}

export default DeleteButton
