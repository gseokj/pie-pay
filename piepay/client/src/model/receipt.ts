import {Menu, Store} from "@/model/store";

export interface Receipt {
    createdAt: string;
    orderId: number;
    orderMenus: Menu[];
    storeInfo: Store;
    totalAmount:number;
}