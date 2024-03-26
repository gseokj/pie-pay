'use client';

import * as styles from '@/styles/signin/telecomlistmodal.css';
import React, { useState, useEffect } from 'react';

type Props = {
  onClose(): void;
  onSelect(telecomName: string): void;
};
export default function TelecomListModal({ onClose, onSelect }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [closing, setClosing] = useState(false); // 닫힘 상태 관리

  // 사용자가 일정 거리 이상 슬라이드 했는지 확인하고 모달을 닫음
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleSelect = (telecomName: string) => {
    onSelect(telecomName);
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
        <div className={styles.title}>통신사를 선택해주세요</div>
        <ul className={styles.ulStyle}>
          <li
            className={styles.liStyle}
            onClick={() => handleSelect('SKT')}
            value="SKT"
          >
            SKT
          </li>
          <li
            className={styles.liStyle}
            onClick={() => handleSelect('KT')}
            value="KT"
          >
            KT
          </li>
          <li
            className={styles.liStyle}
            onClick={() => handleSelect('LG U+')}
            value="LG U+"
          >
            LG U+
          </li>
          <li
            className={styles.liStyle}
            onClick={() => handleSelect('SKT 알뜰폰')}
            value="SKT 알뜰폰"
          >
            SKT 알뜰폰
          </li>
          <li
            className={styles.liStyle}
            onClick={() => handleSelect('KT 알뜰폰')}
            value="KT 알뜰폰"
          >
            KT 알뜰폰
          </li>
          <li
            className={styles.liStyle}
            onClick={() => handleSelect('LG U+ 알뜰폰')}
            value="LG U+ 알뜰폰"
          >
            LG U+ 알뜰폰
          </li>
        </ul>
      </div>
    </div>
  );
}
