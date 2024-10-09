import type { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

import Mailgun from 'mailgun.js'
import formData from 'form-data'

const API_KEY = process.env.MAILGUN_API || ''
const DOMAIN = process.env.MAILGUN_DOMAIN || ''

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

  //send token to user
  // const token = await prisma.verificationToken.create({
  //   data: {
  //     token: `${randomUUID()}${randomUUID()}`.replace(/-/g,''),
  //     userId: user.id
  //   }
  // })

  // const mailgun = new Mailgun(formData)
  // const client = mailgun.client({ username: 'api', key:  API_KEY})

  // const messageData = {
  //   from: `Example Email <hello@your-domain.com>`,
  //   to: user.email,
  //   subject: 'Please Activate Your Account',
  //   text: `Hello ${user.name}, please activate your account by clicking this link: http://localhost:3000/auth/activate/${token.token}`,
  // }

  // await client.messages.create(DOMAIN, messageData)

  return NextResponse.json({
    user:{
      email: user.email
    }
  })
}
