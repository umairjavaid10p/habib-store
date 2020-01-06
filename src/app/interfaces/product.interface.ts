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

export interface ICart {
    createdDate: string;
    items: {
        [key: string]: ICartItem;
    };
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface IOrder {
    id?: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    items: ICartItem[];
    amount: number;
    isComplete: boolean;
    userId: string;
    datePlaced: string;
}
