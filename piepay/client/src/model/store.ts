export interface Store {
    address: string;
    phone: string;
    storeName: string;
    storeCategory:string;
}

export interface Menu{
    menuName: string;
    menuPrice: number;
    quantity: number;
    total: number;
}

interface Order {
    menu: Menu;
    quantity: number;
}

export interface StoreReceipt{

    orderId: number;
    paymentStatus: string;
    store: Store;
    createdAt: string;
    id: number;
    updatedAt: string;
    totalAmount: number;
    newOrderMenusResponse: Order[];

}

export interface temp{
    temp: [];
}