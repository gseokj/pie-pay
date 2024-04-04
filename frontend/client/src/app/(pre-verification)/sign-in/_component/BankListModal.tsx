'use client';

import * as styles from '@/styles/signin/modal.css';
import React, { useState, useEffect } from 'react';

type Props = {
  onClose(): void;
  onSelect(bankName: string, bankCode: string): void;
};

export default function BankListModal({ onClose, onSelect }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [closing, setClosing] = useState(false); // 닫힘 상태 관리

  const bankList = [
    { code: '001', bankName: '한국은행' },
    { code: '002', bankName: '산업은행' },
    { code: '003', bankName: '기업은행' },
    { code: '004', bankName: '국민은행' },
  ];

  // 사용자가 일정 거리 이상 슬라이드 했는지 확인하고 모달을 닫음
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  const handleSelect = (bankName: string, bankCode: string) => {
    onSelect(bankName, bankCode);
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
        <div className={styles.title}>은행을 선택해주세요</div>
        <ul className={styles.ulStyle}>
          {bankList.map((bank, index) => (
            <li
              key={index}
              className={styles.liStyle}
              onClick={() => handleSelect(bank.bankName, bank.code)}
            >
              {bank.bankName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
