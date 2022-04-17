export interface authTokenType {
  token: string;
}
export interface verifyType {
  isLogin: boolean;
}

export interface userInfoType {
  studentId: string | null;
  jiguan: string | null;
  phoneNumber: string;
  role: string;
  nickName: string;
  avatar: string;
  selfIntroduction: string | null;
  officialCertification: string | null;
  gender: number | null;
  age: string | null;
  campus: string | null;
  grade: number | null;
  className: string | null;
  fenyuan: string | null;
  name: string | null;
}

export interface activityDataType {
  list: {
    stId: number;
    stOrganization: string;
    stInitiator: string;
    stInitiatorPhone: string;
    stAuditId: number | null;
    stIntroduce: string;
    stImg: string;
    stTitle: string;
    stApplyStartTime: number;
    stApplyEndTime: number;
    stStartTime: number;
    stEndTime: number;
    stLocation: string;
    stCanNumber: number;
    stFinishNumber: number;
    stalreadyNumber: number;
    stGrade: number;
    stSignWay: string;
    stRank: string;
    stCrowd: string;
    stStatus: number;
    stAuditUnit: string | null;
    stCreateDate: string | null;
  }[];
  total: number;
}
