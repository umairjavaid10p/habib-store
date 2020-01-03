export interface IProductCategory {
    id: string;
    name: string;
    isActive?: boolean;
}

export interface IProduct {
    id?: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}
