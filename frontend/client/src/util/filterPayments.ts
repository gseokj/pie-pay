import {Payment} from "@/model/meet/payment";

export const filterPayments = (targetYear: number, targetMonth: number, payments: Payment[]) => {
    const filteredPayments = payments.filter(payment => {
        const updatedAt = new Date(payment.updatedAt);
        return updatedAt.getFullYear() === targetYear && updatedAt.getMonth() === targetMonth - 1;
    })

    return filteredPayments;
}

export const findStandardTime = (payments: Payment[]) => {
    const result = payments.reduce<{ oldest: Date | null; newest: Date | null }>((acc, payment) => {
        const updatedAt = new Date(payment.updatedAt);
        if (!acc.oldest || updatedAt < acc.oldest) {
            acc.oldest = updatedAt;
        }
        if (!acc.newest || updatedAt > acc.newest) {
            acc.newest = updatedAt;
        }
        return acc;
    }, { oldest: null, newest: null });

    return {
        oldestYear: result.oldest?.getFullYear(),
        oldestMonth: result.oldest ? result.oldest.getMonth() + 1 : null,
        newestYear: result.newest?.getFullYear(),
        newestMonth: result.newest ? result.newest.getMonth() + 1 : null,
    };
}

export const filterTotalAmount = (payments: Payment[]) => {
    const filteredTotalAmount = payments.reduce((acc, payment) => {
        if (payment.totalPayAmount !== null) {
            return acc + payment.totalPayAmount;
        } else {
            return acc;
        }
    }, 0);

    return filteredTotalAmount;
}

export const calculateCategoryAmountsAndPercentages = (payments: Payment[]) => {
    const totalAmount = payments.reduce((acc, payment) => acc + (payment.totalPayAmount || 0), 0);

    const categoryAmounts = payments.reduce((acc, payment) => {
        const category = payment.orders.store.storeCategory;
        const amount = payment.totalPayAmount || 0;

        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;

        return acc;
    }, {} as Record<string, number>);

    const categoryPercentages = Object.keys(categoryAmounts).reduce((acc, category) => {
        const percentage = (categoryAmounts[category] / totalAmount) * 100;
        acc[category] = Math.round(percentage * 100) / 100; // 소수점 둘째 자리까지 반올림

        return acc;
    }, {} as Record<string, number>);

    return { categoryAmounts, categoryPercentages };
}
