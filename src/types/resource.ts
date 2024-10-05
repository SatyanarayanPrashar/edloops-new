export interface User {
    id: number;
    createdAt: Date;
    email: string;
    name: string;
    role: Role;
    courses: Course[];
    enrolledCourses: Course[];
}

export enum Role {
    USER,
    CREATOR,
    ADMIN
}

export interface Course {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    description: string;
    image: string;
    // creator: User;
    // creatorId: number;
    chapters: Chapter[];
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