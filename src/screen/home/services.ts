import { fetchHttp } from '../../utils';
import { CampusNewsItemType } from './data';

export function queryCampusNews(data: Partial<{ type: string; pageNumber: number; pageSize: number }>): Promise<{
  list: CampusNewsItemType[];
  total: number;
}> {
  return fetchHttp('campusNews/queryCampusNews', {
    reqMethod: 'GET',
    data,
  });
}
