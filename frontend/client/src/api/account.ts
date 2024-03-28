import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
import {Account} from "@/model/account";

const axios = localAxios();
const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNTAwMTQzLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.hGZ4jBwzHS-qnjwhJtNA2UcxqiwAg4uVfIUhdv-RJzI";
export const getAccount: QueryFunction<Account> = async () => {
    try {
        const res = await axios.get('/members/accounts',{

            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("hellO");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
