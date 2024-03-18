'use client'

import {QueryClient, useMutation, useMutationState, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {Participant, Participants} from "@/model/participant";
import {Member} from "@/model/member";
import Image from "next/image";
import {getAccount} from "@/api/account";
import {getPayment} from "@/api/payment";
import BankAccount from "@/app/(post-verification)/component/BankAccount";

type Props = {
    params: { payId: string },
}
export default function Page({params}:Props) {
    const {payId} = params;
    const queryClient = useQueryClient();
    const { data: participant, isLoading, error } = useQuery({queryKey: ['payId'], queryFn: getPayment}) ;
    console.log(participant);
    return (<div className="w-[100%]">
    <BankAccount/>

    </div>);
}