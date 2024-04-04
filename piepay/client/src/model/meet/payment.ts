interface Payment {
    payStatus: string;
    openerId: number;
    totalPayAmount: number;
    orders: Order;
    updatedAt: string;
    payId: number;
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

interface Receipt {
    orderId: number;
    storeInfo: StoreInfo;
    orderMenus: OrderMenu[];
    totalAmount: number;
    createdAt: string;
}

interface StoreInfo {
    storeName: string;
    address: string;
    phone: string;
}

interface OrderMenu {
    menuName: string;
    menuPrice: number;
    quantity: number;
    total: number;
}

interface PayMember {
    participants: Participant[];
    payInsteadList: PayInstead[];
}

interface Participant {
    participantId: number;
    memberInfo: MemberInfo;
    isDrinkAlcohol: boolean;
    payAgree: boolean;
    payAmount: number;
}

interface MemberInfo {
    memberId: number;
    nickname: string;
    profileImage: string;
}

interface PayInstead {
    borrowerId: number;
    lenderId: number;
    amount: number;
    payback: boolean;
}

export type {
    Payment, Order, Store,
    Category,
    Receipt, StoreInfo, OrderMenu,
    PayMember, Participant, MemberInfo, PayInstead,
}