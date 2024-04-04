import { ApiResponse } from '@/model/debts';
import { QueryFunction } from '@tanstack/query-core';
import authAxios from '@/util/authAxios';

export const getDebts = async (token: string): Promise<ApiResponse> => {
  try {
    const response = await authAxios.get(`/api/member/debts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('success to get data', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
};
