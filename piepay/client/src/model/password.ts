interface BasicResponse {
  status: number;
  statusText: string;
  message: string;
}

interface result {
  accessToken: string;
  refreshToken: string;
}

interface RequestSetPassword {
  paymentPassword: string;
}

interface ResponsseSetPassword {
  status: number;
  message: string;
  result: result;
}

export type { BasicResponse, RequestSetPassword, ResponsseSetPassword };
