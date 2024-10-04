export interface Resource {
    id: string;
    title: string;
    description: string;
    transcript: string;
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    resources: Resource[];
}

export interface Course {
    title: string;
    description: string;
    image: string;
    chapters: Chapter[];
}