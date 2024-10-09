import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET( request: NextRequest, { params }: {params: { token: string }}) {
  const { token } = params

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              token
            },
          ],
        },
      },
    },
  })

  if (!user) {
    throw new Error('Token is invalid or expired')
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
    },
  })

  await prisma.verificationToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  })

  redirect('/api/auth/signin')
}