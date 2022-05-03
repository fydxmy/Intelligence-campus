import { fetchHttp } from '../../../../utils';
import { proxyPrefix } from '../../../../config';
import { userInfoType } from '../..';

export function updateUserInfo(
  data: Partial<{
    nickName: string;
    avatar: string;
    selfIntroduction: string;
    age: number;
    gender: number;
  }>
): Promise<{ userInfo: userInfoType }> {
  return fetchHttp(`${proxyPrefix}user/updateUserInfo`, {
    reqMethod: 'POST',
    data,
  });
}

export function queryStudentStatus(): Promise<{
  studentStatus: {
    classId: number;
    className: string;
    collegeId: number;
    collegeName: string;
    createdAt: Date;
    dormitory: string;
    gender: number;
    id: number;
    identityNumber: string;
    nativePlace: string;
    phoneNumber: string;
    studentId: string;
    updatedAt: Date;
  };
}> {
  return fetchHttp(`${proxyPrefix}user/queryStudentStatus`, {
    reqMethod: 'GET',
  });
}
