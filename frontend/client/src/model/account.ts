export interface Account{
    mainAccount: boolean;
    bankCode: string;
    accountNo: string;
    balance: string;
}

export interface AccountResponse {
    status: number;
    message: string;
    result: Account[];
}
