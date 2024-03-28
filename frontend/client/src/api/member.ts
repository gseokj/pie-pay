import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
const axios = localAxios();

export const getMembers: QueryFunction<Member[]> = async ({ queryKey }) => {
    const [_,meetId] = queryKey;
    const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNjAyNjczLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfQ0VSVElGSUVEIn0.8xCi66F_2cE-encJ0vSg4iTgzDTWKonjILJf0n33Hfs";

    try {
        const response = await axios.get(`api/meet/${meetId}/member`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
