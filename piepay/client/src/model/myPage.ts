interface RequestMemberModify {
  nickname: string | undefined;
}

interface Member {
  nickname: string;
  profileImage: string;
  phoneNumber: string;
  email: string;
}

interface ResponseMemberModify {
  status: number;
  message: string;
  result: Member;
}

export type { RequestMemberModify, ResponseMemberModify };
