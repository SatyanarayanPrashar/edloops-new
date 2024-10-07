export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdCourses: Course[];
    enrolledCourses: Enrollment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Enrollment {
    id: number;
    userId: number;
    courseId: number;
    user: User;
    course: Course;
    enrolledAt: Date;
}

export interface Course {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    description: string;
    image: string;
    chapters: Chapter[];

    creator?: User;
    creatorId?: number;
    students?: Enrollment[];
}

export interface Chapter {
    id: number;
    title: string;
    description: string;
    courseId: number;
    contents: Content[];
}

export interface Content {
    id: number;
    url: string;
    title: string;
    description: string;
    start: number;
    end: number;
    chapterId: number;
}  