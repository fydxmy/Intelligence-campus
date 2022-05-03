import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { bgColordise } from '../../../../res/colorMap';
import { pxToDp } from '../../../../utils';
import { queryStudentStatus } from '../UserInfoEdit/services';
import NavBar from '../../../../components/NavBar';

interface statusDataItemType {
  content: string;
  title: string;
  id: number;
}
const statusDataListRender = (statusData: undefined | statusDataItemType[]) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginLeft: pxToDp(12),
        marginRight: pxToDp(12),
        borderRadius: pxToDp(10),
        paddingLeft: pxToDp(10),
        paddingRight: pxToDp(10),
        paddingBottom: pxToDp(20),
        marginTop: pxToDp(10),
      }}
    >
      {statusData === undefined ? (
        <></>
      ) : (
        statusData.map((item) => (
          <View
            style={{
              height: pxToDp(50),
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: pxToDp(1),
              borderColor: '#eeeeee',
            }}
            key={item.id}
          >
            <View style={{ width: pxToDp(80) }}>
              <Text style={{ fontSize: pxToDp(16), fontWeight: '500' }}>{item.title}: </Text>
            </View>
            <Text style={{ fontSize: pxToDp(16) }}>{item.content}</Text>
          </View>
        ))
      )}
    </View>
  );
};
export function StudyStatus() {
  const [statusData, setStatusData] = useState<undefined | statusDataItemType[]>(undefined);
  useEffect(() => {
    queryStudentStatus().then((res) => {
      const obj = res.studentStatus;
      const statusDataObj = [
        { id: 12, content: obj.collegeName, title: '所在分院' },
        { id: 2, content: obj.className, title: '所在班级' },
        { id: 4, content: obj.dormitory, title: '所在寝室' },
        {
          id: 3,
          content: obj.gender === 1 ? '男' : '女',
          title: '性  别',
        },
        { id: 6, content: obj.nativePlace, title: '籍  贯' },
        { id: 7, content: obj.phoneNumber, title: '电话号码' },
        { id: 8, content: obj.identityNumber, title: '身份证号' },
        { id: 9, content: obj.studentId, title: '学  号' },
      ];
      setStatusData(statusDataObj);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: bgColordise }}>
      <View style={{ backgroundColor: '#fff' }}>
        <NavBar centerNode={<Text style={{ fontSize: pxToDp(18) }}>学籍信息</Text>} />
      </View>
      {statusData ? (
        statusDataListRender(statusData)
      ) : (
        <View style={{ marginTop: pxToDp(6) }}>
          <Text style={{ fontSize: pxToDp(15), color: '#737373' }}>
            如果有多个信息没有显示，则说明暂时还没有录入学籍信息。请等待……
          </Text>
        </View>
      )}
    </View>
  );
}
