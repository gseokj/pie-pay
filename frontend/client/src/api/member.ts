import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
const axios = localAxios();

export const getMembers: QueryFunction<Member[]> = async ({ queryKey }) => {
    const [_,meetId] = queryKey;
    const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNTAwMTQzLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.hGZ4jBwzHS-qnjwhJtNA2UcxqiwAg4uVfIUhdv-RJzI";

    try {
        const response = await axios.get(`/meet/${meetId}/member`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
