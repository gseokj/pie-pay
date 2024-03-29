'use client';

import React, { useState, useEffect } from 'react';
import TermItem from './TermItem'; // TermItem 컴포넌트를 임포트
import * as styles from '@/styles/signin/terms.css';
// 항목의 타입을 정의
type Term = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  termsList: Term[];
  onAgreeChange: (isAgreed: boolean) => void;
};
export default function BankTerms({ termsList, onAgreeChange }: Props) {
  const [openItemIds, setOpenItemIds] = useState<number[]>([]);
  const [checkedIds, setCheckedIds] = useState<{ [key: number]: boolean }>({});

  // const termsList: Term[] = [
  //   {
  //     id: 1,
  //     title: '[필수] 오픈뱅킹 출금이체 동의',
  //     content: '그래도 동의하시죠?',
  //   },
  //   {
  //     id: 2,
  //     title: '[필수] 금융결제원 개인정보 제공 동의',
  //     content: '그래도 동의하시죠?',
  //   },
  //   {
  //     id: 3,
  //     title: '[필수] 개인(신용)정보 수집 및 이용 동의',
  //     content: '그래도 동의하시죠?',
  //   },
  // ];

  useEffect(() => {
    // 전체 동의 체크 상태 확인
    const isAllAgreed = termsList.every((term) => checkedIds[term.id]);
    onAgreeChange(isAllAgreed);
  }, [checkedIds]); // 의존성 배열에 onAgreeChange 추가

  // 체크박스 상태 변경 처리 함수
  const handleCheckChange = (id: number, isChecked: boolean) => {
    // setCheckedIds를 사용하여 상태를 업데이트합니다.
    setCheckedIds((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

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
      <div className={styles.termTitle}>은행 계좌 연결 동의</div>
      <div className={styles.allTitleBox}>
        <label className={styles.customCheckbox}>
          <input
            type="checkbox"
            className={styles.originalCheckbox}
            checked={termsList.every((term) => checkedIds[term.id])}
            // 모든 항목을 체크하거나 체크 해제
            onChange={(e) => {
              const isChecked = e.target.checked;
              setCheckedIds(
                termsList.reduce<{ [key: number]: boolean }>((acc, term) => {
                  acc[term.id] = isChecked;
                  return acc;
                }, {}),
              );
            }}
          />
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
              isChecked={checkedIds[term.id] || false}
              isOpen={openItemIds.includes(term.id)}
              toggleContent={toggleContent}
              onCheckChange={handleCheckChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
