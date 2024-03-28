'use client';

import * as styles from '@/styles/signin/modal.css';
import TermsItem from './TermsItem';
import React, { useState, useEffect, use } from 'react';

type Props = {
  onClose(): void;
};

export default function TeamsAgreeModal({ onClose }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [closing, setClosing] = useState(false); // 닫힘 상태 관리
  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);

  const termsList = [
    {
      title: '[필수] 파이페이 회원 약관 및 동의사항',
      content: '그래도 동의하시죠?',
    },
    {
      title: '[필수] 본인 확인 서비스 약관 및 동의사항',
      content: '그래도 동의하시죠?',
    },
    // 추가 약관 항목이 있다면 여기에 추가
  ];

  useEffect(() => {
    if (isChecked1 && isChecked2) {
      setClosing(true); // 닫힘 애니메이션 시작
      onClose(); // onClose 함수를 호출하여 모달을 닫음
    }
  }, [isChecked1, isChecked2, onClose]);

  // 사용자가 일정 거리 이상 슬라이드 했는지 확인하고 모달을 닫음
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleSelect = (telecomName: string) => {
    setClosing(true); // 닫힘 애니메이션 시작
    onClose(); // onClose 함수를 호출하여 모달을 닫음
  };

  useEffect(() => {
    // touchStart와 touchEnd가 모두 유효한 숫자인지 확인합니다.
    if (touchStart !== null && touchEnd !== null) {
      // 상단을 아래로 100px 이상 드래그했을 경우 모달 닫기
      if (touchEnd - touchStart > 100) {
        setClosing(true); // 닫힘 애니메이션 시작
        onClose();
        // setTimeout(onClose, 500); // 애니메이션이 끝나면 onClose 호출
      }
    }
  }, [touchEnd, touchStart, onClose]);

  return (
    <div
      className={closing ? styles.modalContainerExit : styles.modalContainer}
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientY)}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.dragHandleWrapper}>
        <div className={styles.dragHandle}></div>
      </div>

      <div className={styles.modalAnimation}>
        <div className={styles.title}>파이페이 동의가 필요해요</div>
        <div className={styles.content}>
          {termsList.map((term, index) => (
            <TermsItem
              key={index}
              title={term.title}
              content={term.content}
              onCheck={
                index === 0
                  ? () => setIsChecked1((prev) => !prev)
                  : () => setIsChecked2((prev) => !prev)
              }
              isBoxChecked={index === 0 ? isChecked1 : isChecked2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
