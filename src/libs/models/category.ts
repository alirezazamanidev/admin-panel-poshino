

export interface Category {
    id: string;
    name: string;
    level: number;
    slug: string;
    description: string;
    imageUrl: string;
    parentId: string;
    created_at: Date;
    updated_at: Date;
    children: Category[];
}