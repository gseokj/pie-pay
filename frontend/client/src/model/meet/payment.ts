interface Payment {
    payStatus: string;
    openerId: number;
    totalPayAmount: number;
    orders: Order;
    updatedAt: string;
}

interface Order {
    orderId: number;
    store: Store;
    paymentStatus: string;
}

interface Store {
    createdAt: string;
    updatedAt: string;
    id: number;
    storeName: string;
    accountNumber: string;
    address: string;
    phone: string;
    storeCategory: string;
}

interface Category {
    name: string;
    amount: number;
}

export type {
    Payment, Order, Store,
    Category
}