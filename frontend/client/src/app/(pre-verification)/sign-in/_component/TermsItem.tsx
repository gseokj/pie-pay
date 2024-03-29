'use client';

import React, { useState } from 'react';
import * as styles from '@/styles/signin/termItem.css'; // Vanilla Extract 스타일 임포트

type Props = {
  title: string;
  content: string;
  onCheck: () => void; // 체크박스 상태 변경 함수
  isBoxChecked: boolean; // 현재 체크박스 상태
};

export default function TermsItem({
  title,
  content,
  onCheck,
  isBoxChecked,
}: Props) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  return (
    <div className={styles.termsItem}>
      {/* label 태그는 체크박스와 제목을 감싸지만, 이벤트 핸들링은 하지 않습니다. */}
      <label className={styles.customCheckbox}>
        <input
          type="checkbox"
          checked={isBoxChecked}
          // 여기서만 onChange 이벤트를 처리합니다.
          onChange={onCheck}
          className={styles.originalCheckbox}
        />
        <span className={styles.checkboxDesign}></span>{' '}
        {/* 가짜 체크박스 디자인 */}
      </label>
      <div
        className={styles.titleBox}
        onClick={() => setIsContentVisible(!isContentVisible)}
      >
        {title} <button className={styles.dropdownButton}>▼</button>
      </div>

      {isContentVisible && <p className={styles.termsContent}>{content}</p>}
    </div>
  );
}
