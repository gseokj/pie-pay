interface ApiResponse {
  status: number;
  message: string;
  result: Result;
}

interface Result {
  myLent: MyLent[];
  myBorrowed: MyBorrowed[];
}

interface MyLent {
  payInsteadId: number;
  borrowerName: string;
  borrowerProfile: string;
  lenderName: string;
  lenderProfile: string;
  amount: number;
  payback: boolean;
  createdAt: string | null;
}

interface MyBorrowed {
  payInsteadId: number;
  borrowerName: string;
  borrowerProfile: string;
  lenderName: string;
  lenderProfile: string;
  amount: number;
  payback: boolean;
  createdAt: string;
}

export type { ApiResponse, Result };
