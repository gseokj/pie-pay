// TermItem.tsx
'use client';

import React from 'react';
import * as styles from '@/styles/signin/terms.css'; // Vanilla Extract 스타일 임포트

// props의 타입을 정의하는 인터페이스
type Props = {
  term: {
    id: number;
    title: string;
    content: string;
  };
  isOpen: boolean;
  isChecked: boolean; // 추가
  toggleContent: (id: number) => void;
  onCheckChange: (id: number, isChecked: boolean) => void; // 추가
};

export default function TermItem({
  term,
  isOpen,
  isChecked,
  toggleContent,
  onCheckChange,
}: Props) {
  return (
    <>
      <li className={styles.styleLi} onClick={() => toggleContent(term.id)}>
        <div className={styles.termHeader}>
          {/* Flexbox를 사용하는 새로운 div 추가 */}
          <div className={styles.titleBox}>
            <label className={styles.customCheckbox}>
              <input
                type="checkbox"
                className={styles.originalCheckbox}
                checked={isChecked}
                onChange={(e) => onCheckChange(term.id, e.target.checked)}
              />
              <span className={styles.checkboxDesign}></span>{' '}
            </label>
            {term.title} <button className={styles.dropdownButton}>▼</button>
          </div>
          {/* 제목을 span으로 감싸고 스타일 적용 */}
        </div>
        {isOpen && <div>{term.content}</div>}
      </li>
    </>
  );
}
