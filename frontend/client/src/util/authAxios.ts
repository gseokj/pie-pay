import axios from "axios";

const authAxios = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/auth`, {
            method: 'GET'
        });
        const token = await response.json();

        if (token.data && token.data.value) {
            const accessToken = token.data.value;

            const instance = axios.create({
                baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            return instance;
        } else {
            throw new Error("Token not found or invalid");
        }
    } catch (error) {
        console.error("Error fetching auth token:", error);
        throw error;
    }
};

export default authAxios;
