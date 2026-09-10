import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  if (!process.env.RAZORPAY_KEY_ID) return NextResponse.json({ error: 'Razorpay is not configured.' }, { status: 500 })
  return NextResponse.json({ key_id: process.env.RAZORPAY_KEY_ID })
}
