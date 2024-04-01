import {useEffect, useState} from "react";
import { useQueryClient} from "@tanstack/react-query";
import * as React from 'react';
import {Payment} from "@/model/participant";
import {numCheck} from "@/util/dateFormat"

type Props={
    payId:number;
}
export default function Refresh({payId}:Props){

    const queryClient = useQueryClient();
    const payment: Payment | undefined = queryClient.getQueryData(["payment",payId]);
    let createdAtDate = new Date(payment?.createdAt || "1970-01-01T00:00:00.000Z");
    createdAtDate.setHours(createdAtDate.getHours() + 9);
    const newDate = createdAtDate.getTime();
    const [currDate, setCurrDate] = useState(new Date());
    const [remainingTime, setRemainingTime] = useState(90);
    const [result, setResult] = useState("");
    const [progressBar, setProgressBar] = useState(0)
    useEffect(() => {
        const intervalId = setInterval(() => {

            setCurrDate(new Date());

        }, 100);
        setProgressBar(300+(newDate-currDate.getTime()) / 1000);
        setRemainingTime(300+Math.floor((newDate-currDate.getTime()) / 1000));
        setResult(`${numCheck(Math.floor(remainingTime/60))}:${numCheck(Math.floor(remainingTime%60))}`);
        return () => clearInterval(intervalId);
    }, [currDate]);

    return(<>{remainingTime >= 0 ? result : "시간 초과!"}</>);


}