import { useState, useEffect } from 'react';
import * as styles from '@/styles/signin/timer.css';

export default function Timer() {
  const [seconds, setSeconds] = useState(300);
  useEffect(() => {
    // 1초마다 seconds 상태를 감소시키는 타이머를 설정
    // 시간이 0보다 크면 1초 감소, 그렇지 않으면 0 유지
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
    }, 1000);

    // 타이머 정리
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 타이머가 0이 되면 타이머를 정지
  useEffect(() => {
    if (seconds === 0) {
      alert('타이머가 종료되었습니다.');
      clearInterval(seconds);
    }
  }, [seconds]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.ment}>남은 시간</div>{' '}
      <div className={styles.remainTime}>{formatTime(seconds)}</div>
    </div>
  );
}
