import { fetchHttp } from '../utils';
import { proxyPrefix } from '../config';

export function uploadSingleFile(data: any, customHeaders?: { [key: string]: string }): Promise<{ uri: string }> {
  return fetchHttp(`${proxyPrefix}upload/uploadSingleFile`, {
    reqMethod: 'POST',
    data,
    customHeaders,
  });
}
