interface VerifyPhoneNumber {
  phoneNumber: string;
}

interface VerifyPhoneNumberResponse {
  status: number;
  message: string;
  result: string;
}

interface ConfirmPhoneNumber {
  phoneNumber: string;
  verificationNumber: string;
}

interface RequestBankVerify {
  bankCode: string;
  accountNo: string;
}

interface ConfirmBankVerify {
  bankCode: string;
  accountNo: string;
  verificationWord: string;
}

interface BasicResponse {
  status: number;
  statusText: string;
  message: string;
}

export type {
  VerifyPhoneNumber,
  VerifyPhoneNumberResponse,
  ConfirmPhoneNumber,
  RequestBankVerify,
  ConfirmBankVerify,
  BasicResponse,
};
