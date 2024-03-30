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
  verificationNumver: string;
}

export type {
  VerifyPhoneNumber,
  VerifyPhoneNumberResponse,
  ConfirmPhoneNumber,
};
