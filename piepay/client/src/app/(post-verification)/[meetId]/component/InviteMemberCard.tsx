import * as buttonStyles from "@/styles/main/mainButton.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";


interface InviteMemberProps {
    meetInvitation: string;
}


export default function InviteMemberCard(
    { meetInvitation }: InviteMemberProps) {

    return (
        <section
            className={ cardStyles.cardLayout.furtherPadding }
        >
            <div
                className={ cardStyles.cardInnerLayout.defaultHeader }
            >
                <h3
                    className={ fontStyles.semibold }
                >멤버 초대</h3>
                <p>
                    모임 멤버가 혼자에요<br/>
                    멤버를 초대해보세요
                </p>
            </div>
            <div
                className={ cardStyles.cardInnerLayout.inviteInner }
            >
                <p>초대코드</p>
                <h1
                    className={ fontStyles.bold }
                >{ meetInvitation.toUpperCase() }</h1>
            </div>
            <button
                className={ `${buttonStyles.mainButton.modalButton} ${fontStyles.bold}` }
            >링크 생성하기</button>
        </section>
    );
}