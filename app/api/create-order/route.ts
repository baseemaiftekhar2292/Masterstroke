import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const amount = Number(body.amount)
    const currency = typeof body.currency === 'string' ? body.currency : 'INR'
    const receipt = typeof body.receipt === 'string' ? body.receipt : `masterstroke_${Date.now()}`

    if (!Number.isInteger(amount) || amount < 100) {
      return NextResponse.json({ error: 'Amount must be an integer of at least 100 paise.' }, { status: 400 })
    }
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Razorpay is not configured on the server.' }, { status: 500 })
    }

    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    const order = await razorpay.orders.create({ amount, currency, receipt })
    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency })
  } catch (error: any) {
    const status = error?.statusCode === 401 ? 401 : 500
    return NextResponse.json({ error: error?.error?.description || 'Unable to create Razorpay order.' }, { status })
  }
}
