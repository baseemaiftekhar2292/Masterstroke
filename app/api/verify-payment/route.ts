import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment verification fields.' }, { status: 400 })
    }
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Razorpay is not configured on the server.' }, { status: 500 })
    }
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
    const provided = Buffer.from(String(razorpay_signature))
    const expected = Buffer.from(expectedSignature)
    const valid = provided.length === expected.length && crypto.timingSafeEqual(expected, provided)
    if (!valid) return NextResponse.json({ verified: false, error: 'Payment signature mismatch.' }, { status: 400 })
    return NextResponse.json({ verified: true, payment_id: razorpay_payment_id, order_id: razorpay_order_id })
  } catch {
    return NextResponse.json({ error: 'Invalid payment verification request.' }, { status: 400 })
  }
}
