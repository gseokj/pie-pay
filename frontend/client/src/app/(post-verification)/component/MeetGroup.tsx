import {Dummy} from "../page";


interface MeetMember {
    memberId: number;
    nickname: string;
    profileImage:string;
}


export default function MeetGroup(props : {dummy: Dummy}){
    const { dummy } = props;
    return (
        <>
            <div>
                <div>
                    <div>
                        <img src={dummy.meetImage} alt="meet image" width={40} height={40}/>
                        <div>
                            <h1>{dummy.meetName}</h1>
                            <p>{dummy.meetDate}</p>
                        </div>
                    </div>
                    <div>
                        {dummy.favorite ? 'favorite!' : 'no.. favorite'}
                    </div>
                </div>
                <div>
                    <div>
                        {dummy.meetMembers.slice(0, 5).map((member: MeetMember) => {
                            return (
                                <img src={member.profileImage} alt="member image" width={24} height={24}/>
                            )
                        })}
                        {dummy.meetMembers.length > 5 ?
                            <div>dots, more members</div>
                            : ''
                        }
                    </div>
                    <button>바로 결제</button>
                </div>
            </div>
        </>
    );
}