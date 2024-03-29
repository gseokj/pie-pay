'use client';

import React, { useState } from 'react';
import TermItem from './TermItem'; // TermItem 컴포넌트를 임포트
import * as styles from '@/styles/signin/terms.css';
// 항목의 타입을 정의
type Term = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  index: number;
  setAgree: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export default function MydataTerms({ index, setAgree }: Props) {
  const [openItemIds, setOpenItemIds] = useState<number[]>([]);

  const termsList: Term[] = [
    {
      id: 1,
      title: '[필수] 개인 및 고유식별정보 수집 및 이용 동의',
      content: '그래도 동의하시죠?',
    },
    {
      id: 2,
      title: '[필수] 상세정보 관련 개인정보 수집 이용 동의',
      content: '그래도 동의하시죠?',
    },
    {
      id: 3,
      title: '[필수] 개인정보 제3자 제공 동의',
      content: '그래도 동의하시죠?',
    },
  ];

  const toggleContent = (id: number) => {
    // 이미 열린 항목이면 닫고, 그렇지 않으면 열기
    setOpenItemIds((prev) => {
      if (prev.includes(id)) {
        // 이미 열려있는 항목은 배열에서 제거
        return prev.filter((itemId) => itemId !== id);
      } else {
        // 새로운 항목은 배열에 추가
        return [...prev, id];
      }
    });
  };

  return (
    <div className={styles.termContent}>
      <div className={styles.termTitle}>마이데이터 사용 동의</div>
      <div className={styles.allTitleBox}>
        <label className={styles.customCheckbox}>
          <input type="checkbox" className={styles.originalCheckbox} />
          <span className={styles.checkboxDesign}></span>{' '}
        </label>
        전체 동의
      </div>
      <div className={styles.scrollContent}>
        <ul>
          {termsList.map((term) => (
            <TermItem
              key={term.id}
              term={term}
              isOpen={openItemIds.includes(term.id)}
              toggleContent={toggleContent}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
