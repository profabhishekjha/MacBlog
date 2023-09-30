import prisma from '@/utils/connect'
import { getAuthSessions } from '@/utils/auth'
import { NextResponse } from 'next/server'

export const POST = async (req, { params }) => {
  const { postId } = params

  console.log(postId)

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if (!post) {
      return new NextResponse(JSON.stringify({ message: 'Post not found' }, { status: 404 }))
    }

    await prisma.post.delete({
      where: {
        id: postId
      }
    })

    return new NextResponse(
      JSON.stringify({ message: 'Post deleted successfully' }, { status: 200 })
    )
  } catch (error) {
    console.error('Error deleting post:', error)
    return new NextResponse(JSON.stringify({ message: 'Something went wrong' }, { status: 500 }))
  }
}
