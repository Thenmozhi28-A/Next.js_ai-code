// app/api/register/route.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Email already இருக்கான்னு check பண்ணு
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return Response.json(
        { error: '❌ Email already use-ல இருக்கு!' },
        { status: 400 }
      )
    }

    // Password hash பண்ணு
    const hashedPassword = await bcrypt.hash(password, 10)

    // Database-ல் save பண்ணு
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    return Response.json(
      { message: '✅ User create ஆச்சு!', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: '❌ Server error!' },
      { status: 500 }
    )
  }
}