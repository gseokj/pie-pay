import {Dummy} from "../page";
import * as styles from "@/styles/main/MeetGroup.css"
import StarIcon from "@/app/(post-verification)/component/StarIcon";
import dots from "@/assets/icons/dots.svg";
import theme from "@/styles/theme/theme";
import Image from "next/image";
import {meetName} from "@/styles/main/MeetGroup.css";


interface MeetMember {
    memberId: number;
    nickname: string;
    profileImage:string;
}


export default function MeetGroup(props : {dummy: Dummy}){
    const { dummy } = props;
    return (
        <>
            <div className={styles.meetContainer}>
                <div className={styles.lineOne}>
                    <div className={styles.meetInfo}>
                        <div className={styles.meetImageContainer}>
                            <img className={styles.meetImage} src={dummy.meetImage} alt="meet image" width={40} height={40}/>
                        </div>
                        <div className={styles.meetInfoString}>
                            <h3 className={meetName}>{dummy.meetName}</h3>
                            <p>{dummy.meetDate}</p>
                        </div>
                    </div>
                    <div>
                        <StarIcon color={dummy.favorite ? theme.yellow : theme.lightGray} />
                    </div>
                </div>
                <div className={styles.lineTwo}>
                    <div className={styles.profileImageContainer}>
                        {dummy.meetMembers.slice(0, 5).map((member: MeetMember) => {
                            return (
                                <img className={styles.meetMemberImage} src={member.profileImage} alt="member image" width={24} height={24}/>
                            )
                        })}
                        {dummy.meetMembers.length > 5 ?
                            <>
                                <Image src={dots} alt="dots" width={28} height={28} />
                                <p>{'+' + (dummy.meetMembers.length - 5)}</p>
                            </>
                            : ''
                        }
                    </div>
                    <button className={styles.paymentButton}>바로 결제</button>
                </div>
            </div>
        </>
    );
}