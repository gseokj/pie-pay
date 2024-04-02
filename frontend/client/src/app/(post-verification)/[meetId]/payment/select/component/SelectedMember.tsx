'use client';

import * as styles from '@/styles/payment/select/selectedMember.css';
import beer from '@/assets/icons/checkbeer.svg';
import Image from 'next/image';
import { useMemberFilter } from '@/store/useMemberFilter';


export default function SelectedMember() {
  const { filterMembers } = useMemberFilter();
  return (

    <div className={styles.selectedContainer}>
      {filterMembers.filter(member => member.isSelected).map((member, index) => (
        <div className={styles.member} key={member.memberId}>
          <img className={styles.image} src={member.profileImage} alt="" width={50} />
          <div className="flex w-[10%]">
            <p className={styles.memberName}>
              {index === 0 && '나'}
              {index !== 0 && member.nickname}
            </p>

            {member.isDrinkAlcohol && member.isTypeAlcohol && <div className={styles.animationPing}>
                    <span className="relative flex h-3 w-3 bottom-[270%] left-[80%] ">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75">
                    </span><Image src={beer} alt="" /></span>
            </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
}