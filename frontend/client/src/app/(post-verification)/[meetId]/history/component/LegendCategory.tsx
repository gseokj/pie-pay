import {Category} from "@/model/meet/payment";
import * as fontStyles from "@/styles/fonts.css";
import * as paymentStyles from "@/styles/meet/meetPayments.css";
import LeisureIcon from "@/app/(post-verification)/[meetId]/history/component/icons/CategoryLeisure";
import FoodIcon from "@/app/(post-verification)/[meetId]/history/component/icons/CategoryFood";
import TransportIcon from "@/app/(post-verification)/[meetId]/history/component/icons/CategoryTransport";

interface LegendProps {
    props: { category: Category, totalAmount: number, index: number },
}

export default function LegendCategory({ props }: LegendProps) {
    const { category, totalAmount, index } = props;
    const legendColors = ["rgb(250,157,91)", "rgb(105,238,117)", "rgb(125,161,231)"];
    const percentage = (category.amount / totalAmount) * 100;

    const getName = (name: string) => {
        switch (name) {
            case 'LEISURE':
                return '여가';
            case 'FOOD':
                return '식비';
            case 'TRANSPORT':
                return '교통';
            default:
                return '없음';
        }
    }
    const name = getName(category.name);

    return (
        <div className={paymentStyles.legend}>
            {name === '여가' && <LeisureIcon color={legendColors[index]} />}
            {name === '식비' && <FoodIcon color={legendColors[index]} />}
            {name === '교통' && <TransportIcon color={legendColors[index]} />}
            <p>{name}</p>
            <p className={fontStyles.semibold}>{Math.round(percentage * 10) / 10}%</p>
        </div>
    );
}