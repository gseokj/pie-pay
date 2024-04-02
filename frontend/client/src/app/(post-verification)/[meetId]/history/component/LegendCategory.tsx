import {Category} from "@/model/meet/payment";
import * as fontStyles from "@/styles/fonts.css";

interface LegendProps {
    props: { category: Category, totalAmount: number },
}

export default function LegendCategory({ props }: LegendProps) {
    const { category, totalAmount } = props;
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
        <div>

            <div>
                <p>{name}</p>
                <span className={fontStyles.semibold}>{Math.round(percentage * 10) / 10}%</span>
            </div>
        </div>
    );
}