interface Store {
  storeName: string;
  address: string;
  phone: string;
}

interface Result {
  participantId: number;
  payId: number;
  payAmount: number;
  updateAt: string;
  store: Store;
  drinkAlcohol: boolean;
}

interface Pay {
  status: number;
  message: string;
  result: Result[];
}

export type { Pay };
