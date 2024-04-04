import axios from "axios";

function getCookie(name: string) {
    let cookieArray = document.cookie.split('; ');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookiePair = cookieArray[i].split('=');
        if(name == cookiePair[0]) {
            return cookiePair[1];
        }
    }
    return null;
}

const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

export default authAxios;
