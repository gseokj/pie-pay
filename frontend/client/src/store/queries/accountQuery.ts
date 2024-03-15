import {QueryFunction} from "@tanstack/query-core";
import {Account} from "@/model/account";

export const getAccount: QueryFunction<Account> = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/members/accounts`, {
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}