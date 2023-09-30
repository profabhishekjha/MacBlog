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
        // Post deleted successfully, you can handle this as needed (e.g., show a success message)
        console.log('Post deleted successfully: ', response)
        // Redirect to the homepage or another appropriate page
      } else {
        // Error deleting post, handle it accordingly (e.g., show an error message)
        console.error('Error deleting post')
      }
    } catch (error) {
      // Fetch error, handle it accordingly (e.g., show an error message)
      console.error('Error deleting post:', error)
    }
  }

  return <button onClick={handleDelete}>Delete</button>
}

export default DeleteButton
