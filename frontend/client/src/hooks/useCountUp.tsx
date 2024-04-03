import { useEffect, useState } from 'react'

export default function useCountUp(end: number, start = 0, duration = 300) {
  const [count, setCount] = useState(start)
  const frameRate = 1000 / 60
  const totalFrame = Math.round(duration / frameRate)

  useEffect(() => {
    let currentNumber = start
    const counter = setInterval(() => {
      const progress = ++currentNumber / totalFrame
      setCount(Math.round(end * progress))

      if (progress === 1) {
        clearInterval(counter)
      }
    }, frameRate)
  }, [end, frameRate, start, totalFrame])

  return count
}