import { QueryFunction } from "@tanstack/query-core";
import localAxios from "@/util/localAxios";
import {Notification} from "@/model/notification"
import { MeetInfoResponse } from '@/model/meet';
import authAxios from '@/util/authAxios';

const axios = localAxios();

export const connectSSE: QueryFunction<EventSource> = async ({ queryKey }) => {
  const [_,token] = queryKey;
  console.log(11);
  try {
    const response = await authAxios.get(`/api/sse/subscribe`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('success to get data', response.data);
    return response.data.result;
  } catch (error) {
    console.error('Failed to get data', error);
    throw new Error('Failed to get data');
  }
}