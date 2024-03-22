import {MeetInfo} from "@/app/(post-verification)/[meetId]/page";


interface MeetInfoCardProps {
    meetInfo: MeetInfo;
}


export default function MeetInfoCard({ meetInfo }: MeetInfoCardProps) {
    return (
        <section>
            <div>
                <img src={meetInfo.meetImage} />
            </div>
            <div>
                <h3></h3>
                <p>since {meetInfo.createdAt}</p>
            </div>
            <button>
            </button>
        </section>
    );
}