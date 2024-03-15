'use client'

import {useMemberFilter} from "@/store/stores/useMemberFilter";
import {useEffect} from "react";
import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAccount} from "@/store/queries/accountQuery";
import axios from "axios";

export default function Page(){
    const { filterMembers } = useMemberFilter();
    const queryClient = new QueryClient();
    console.log(filterMembers);
    useQuery({
        queryKey: ['participant'],
        queryFn: () => Promise.resolve(filterMembers),

    });
    const mutation = useMutation({
        mutationFn: (newTodo) => {
            return axios.post('/todos', newTodo)
        },
    })

    return (<>hello</>);
}