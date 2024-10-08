import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response){
  const { fullname, email, password } = await req.json()
  const hashed = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name: fullname,
      email,
      password: hashed
    }
  })

  return NextResponse.json({
    user:{
      email: user.email
    }
  })
}
