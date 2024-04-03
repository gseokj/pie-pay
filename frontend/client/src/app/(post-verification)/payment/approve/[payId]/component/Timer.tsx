import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getPayment} from "@/api/payment";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { usePayment } from '@/store/usePayment';

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

type Props={
    payId:number;
}
export default function Page({payId}:Props){
    const { payment, isLoading, updatePayment } = usePayment();
    let createdAtDate = new Date(payment?.createdAt || "1970-01-01T00:00:00.000Z");
    createdAtDate.setHours(createdAtDate.getHours() + 9);
    const newDate = createdAtDate.getTime();
    const [currDate, setCurrDate] = useState(new Date());

    const [remainingTime, setRemainingTime] = useState(90);
    const [progressBar, setProgressBar] = useState(0)
    useEffect(() => {
        const intervalId = setInterval(() => {

            setCurrDate(new Date());

        }, 100);
        setProgressBar(100+(newDate-currDate.getTime()) / 1000);
        setRemainingTime(100+Math.floor((newDate-currDate.getTime()) / 1000));
        return () => clearInterval(intervalId);
    }, [currDate]);


    return(<div className="mb-5">{remainingTime>0 && <p>{remainingTime}초 이내에 선택해 주세요!</p>}
        {remainingTime>0 && <BorderLinearProgress variant="determinate" value={progressBar} />}
        {remainingTime<=0 && <p>만료된 페이지입니다. 결제를 다시 진행해주세요!</p>}
    </div>);

}