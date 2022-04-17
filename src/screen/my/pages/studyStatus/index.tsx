import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import XmyNav from '../../../../components/xmyNav';
import { bgColordise } from '../../../../res/colorMap';
import { STUDYSTATUS_URL } from '../../../../utils/pathMap';
import { pxToDp, useFetchHttp } from '../../../../utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
      {statusData == undefined ? (
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
            <Text style={{ fontSize: pxToDp(16), fontWeight: '500' }}>{item.title}: </Text>
            <Text style={{ fontSize: pxToDp(16) }}>{item.content}</Text>
          </View>
        ))
      )}
      <View style={{ marginTop: pxToDp(6) }}>
        <Text style={{ fontSize: pxToDp(15), color: '#737373' }}>
          如果有多个信息没有显示，则说明暂时还没有录入学籍信息。请等待……
        </Text>
      </View>
    </View>
  );
};
type PropsType = NativeStackScreenProps<{ Profile: { pageName: string; url: string } }, 'Profile'>;
export function StudyStatus(props: PropsType) {
  const a = props.navigation;
  const [statusData, setStatusData] = useState<undefined | statusDataItemType[]>(undefined);
  const client = useFetchHttp();

  useEffect(() => {
    getStudyStatusData();
  }, []);

  const getStudyStatusData = async () => {
    client(STUDYSTATUS_URL, { reqMethod: 'POST' }).then((obj: any) => {
      const statusDataObj = [
        { id: 1, content: obj.campus, title: '所在学区' },
        { id: 12, content: obj.fenyuan, title: '所在分院' },
        { id: 2, content: obj.className, title: '所在班级' },
        { id: 4, content: obj.dormitory, title: '所在寝室' },
        { id: 5, content: obj.name, title: '姓名' },
        {
          id: 3,
          content: obj.gender == 1 ? '男' : obj.gender == 0 ? '女' : '',
          title: '性别',
        },
        { id: 6, content: obj.jiguan, title: '籍贯' },
        { id: 7, content: obj.phoneNumber, title: '电话号码' },
        { id: 8, content: obj.sfzId, title: '身份证号' },
        { id: 9, content: obj.studentId, title: '学号' },
        { id: 10, content: obj.admissionTeacher, title: '招生老师' },
        { id: 11, content: obj.hotline, title: '热心电话' },
      ];
      setStatusData(statusDataObj);
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: bgColordise }}>
      <View style={{ backgroundColor: '#fff' }}>
        <XmyNav
          onPress={() => {
            props.navigation.goBack();
          }}
          centerContent="学籍信息"
          StatusBarColor="dark-content"
        />
      </View>
      {statusDataListRender(statusData)}
    </View>
  );
}
