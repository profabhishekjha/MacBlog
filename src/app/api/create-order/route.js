import prisma from '@/utils/connect'
import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        const body = await req.json()

        const donation = await prisma.donation.create({
            data: {
                name: body.name,
                email: body.email,
                amount: parseInt(body.donate),
                status: 'Pending'
            }
        })

        const rzp = new Razorpay({
            key_id: 'rzp_test_ki28mf8RJoXGw4',
            key_secret: 'oBtdfiQn3POvk0BtxYCUC6FY'
        })

        const options = {
            amount: body.donate * 100,
            currency: 'INR',
            payment_capture: 1,
            notes: {
                donationId: donation.id
            }
        }

        const order = await rzp.orders.create(options)
        const orderId = order.id

        // Return the order ID to the client
        return new NextResponse(JSON.stringify({ orderId, status: 200 }), {
            status: 200
        })
    } catch (error) {
        console.error(error)
        return new NextResponse(
            JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
        )
    }
}
