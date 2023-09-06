import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (req.cookies.get('hoge')?.value === undefined) {
    res.cookies.set('hoge', 'fuga', {
      httpOnly: true,
    })
  }

  return res
}