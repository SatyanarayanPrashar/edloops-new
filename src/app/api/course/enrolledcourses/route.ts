import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId: Number(userId) },
            include: { course: true },
        });

        return NextResponse.json({ enrollments }, { status: 200 });
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: 'You must be logged in to enroll in a course' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await req.json()
    const { courseId } = body

    if (!courseId) {
        return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    try {
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: Number(userId),
                    courseId: parseInt(courseId),
                },
            },
        })

        if (existingEnrollment) {
            return NextResponse.json({ error: 'You are already enrolled in this course' }, { status: 400 })
        }

        const enrollment = await prisma.enrollment.create({
            data: {
                userId: Number(userId),
                courseId: parseInt(courseId)
            },
        });

        return NextResponse.json({ message: 'Successfully enrolled in course', enrollment }, { status: 200 })
    } catch (error) {
        console.error('Error enrolling in course:', error)
        return NextResponse.json({ error: 'Failed to enroll in course' }, { status: 500 })
    }
}
