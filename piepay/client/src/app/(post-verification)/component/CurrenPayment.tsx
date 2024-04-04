import right from '@/assets/icons/arrowright.svg';
import Image from 'next/image';
import useProgressbar from '@/hooks/useProgressbar';
import {numCheck} from '@/util/dateFormat'
import * as styles from '@/styles/main/currPayment.css'

type Props= {
  payId: number;
  meetName: string;
  updatedAt: string |undefined;
  handleReplace: (payId:number)=>void;
}
const curr = new Date().toISOString();
export default function CurrentPayment({payId,meetName,updatedAt,handleReplace}:Props) {
  const [remainingTime, progressBarComponent] = useProgressbar(updatedAt?updatedAt:curr);
  return (<>
    <div onClick={()=>handleReplace(payId)} className={styles.container}>
      <div className={styles.letters}>
        <div>
          <p className={styles.p.meet}>{meetName}</p>
          <p className={styles.p.notice}>진행 중인 결제가 있어요</p>
        </div>
        <div>
          <Image className={styles.image} width={30} height={30} src={right} alt="" />
        </div>
      </div>
      { Number(remainingTime) >0 &&
      <div className={styles.progress}>
        <p className={styles.time}>{Math.floor(Number(remainingTime)/60)}:{numCheck(Number(remainingTime)%60)}</p>
        {progressBarComponent}
      </div>
      }
    </div>
  </>);
}