import * as styles from "@/styles/payment/selectedMember.css";
import {faker} from "@faker-js/faker";

const Members = [
    {memberId: 'elonmusk', nickname: '일론머', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'seokju', nickname: '석주', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'goseok', nickname: '응애', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'elonmusk', nickname: '스티브', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'seokju', nickname: '코일', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'goseok', nickname: '잡스', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'elonmusk', nickname: '준수', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {memberId: 'seokju', nickname: '기분', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
]
interface Props {
    // memberId: number;
    nickname: string;
    profileImage: string;
    // payAgree: boolean;
    // isDrinkAlcohol: boolean;
    // isTypeAlcohol: boolean;
}

export default function SelectedMember({nickname,profileImage}:Props){
    return(
            <div className={styles.member}><img className={styles.image} src={profileImage} alt="" width={50}/>
                <p className={styles.memberName}>{nickname}</p>
            </div>
    );
}