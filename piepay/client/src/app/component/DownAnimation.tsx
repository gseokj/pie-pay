import React from 'react';
import hand from '@/assets/icons/hand.svg'

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export const moveDownAnimation = `@keyframes moveDown {
  from {
    transform: translateY(-140vh);
    opacity: 1;
  }
  to {
    transform: translateY(100vh);
    opacity: 1;
  }
}`;

// 손모양 기본 스타일
const baseHandStyle: React.CSSProperties = {
  fontSize: '40px',
  animation: 'moveDown 6s 1',
};

export const hands = Array.from({ length: 10 }).map((_, index) => {
  const randomLeft = Math.random() * window.innerWidth;
  const randomTop = -100 - Math.random() * 100;
  const randomAnimationDelay = Math.random() * 5;

  const style: React.CSSProperties = {
    ...baseHandStyle,
    left: `${randomLeft}px`,
    top: `${randomTop}px`,
    animationDelay: `${randomAnimationDelay}s`,
    transform: 'translateX(-50%)',
    position: 'fixed',
  };

  return <p key={index} style={style}>👋</p>;
});
