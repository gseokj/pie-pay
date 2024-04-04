import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import * as React from 'react';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function useProgressbar(createdAt?: string) { // Make createdAt optional
  const [currDate, setCurrDate] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState<number>(90);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [progressBarComponent, setProgressBarComponent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    const createdAtDate = createdAt ? new Date(createdAt) : new Date();
    const newDate = createdAtDate.getTime();

    const intervalId = setInterval(() => {
      setCurrDate(new Date());
    }, 100);

    const progress = 100 + (newDate - currDate.getTime()) / 1000;
    setProgressBar(progress);
    setRemainingTime(Math.floor(progress));

    const progressBarJSX = (
      <div className="mb-5">
        {remainingTime > 0 && <BorderLinearProgress variant="determinate" value={progressBar} />}
      </div>
    );
    setProgressBarComponent(progressBarJSX);

    return () => clearInterval(intervalId);
  }, [currDate, createdAt]); // Include createdAt in the dependency array

  return [remainingTime, progressBarComponent];
}
