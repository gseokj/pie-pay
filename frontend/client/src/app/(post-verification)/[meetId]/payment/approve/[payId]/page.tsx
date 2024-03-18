'use client'

import {useMemberFilter} from "@/store/stores/useMemberFilter";
import {useEffect} from "react";
import {QueryClient, useMutation, useMutationState, useQuery, useQueryClient} from "@tanstack/react-query";
import { postParticipant} from "@/store/queries/participantQuery";
import axios from "axios";
import {Participant} from "@/model/participant";


export default function Page(){

    const queryClient = new QueryClient();
    const a = useMutation({mutationKey: ["participant"], mutationFn:postParticipant});
    console.log(a);


    return (<>
        Hello

    </>);
}