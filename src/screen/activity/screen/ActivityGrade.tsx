import React, { useEffect, useState } from 'react';
import { Text, View, TouchableWithoutFeedback, SafeAreaView, FlatList, DeviceEventEmitter } from 'react-native';
import { bgColordise } from '../../../res/colorMap';
import { pxToDp } from '../../../utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { queryActivityGrade } from '../services';
// import { ActivityListItemType } from '../data';
import XmyNav from '../../../components/xmyNav';
type ActivityGradeListItemType = {
  activityId: number;
  createdAt: string;
  grade: number;
  id: number;
  phoneNumber: string;
  studentId: string;
  title: string;
  updatedAt: string;
};
export function ActivityGrade() {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const [activityGrade, setActivityGrade] = useState<ActivityGradeListItemType[]>([]);
  useEffect(() => {
    queryActivityGrade({}).then((res) => {
      console.log(res.list[0]);
      setActivityGrade(res.list);
    });
    return () => {
      DeviceEventEmitter.emit('refreshActivity');
    };
  }, []);
  const renderItem = ({ item }: { item: ActivityGradeListItemType }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('ActivityDetails', { detailsInfo: item });
        }}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            marginBottom: pxToDp(80),
            paddingLeft: pxToDp(12),
            paddingRight: pxToDp(12),
            paddingTop: pxToDp(10),
            paddingBottom: pxToDp(10),
            borderRadius: pxToDp(6),
            borderBottomWidth: pxToDp(1),
            borderColor: '#eee',

            height: pxToDp(60),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <View>
              <Text style={{ fontSize: pxToDp(18), marginRight: pxToDp(10) }}>{item.id}</Text>
            </View>
            <View>
              <Text style={{ fontSize: pxToDp(18) }}>{item.title}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <View>
              <Text style={{ marginRight: pxToDp(30) }}>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </View>
            <View>
              <Text style={{ fontSize: pxToDp(14) }}>{item.grade}分</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ backgroundColor: bgColordise, flex: 1 }}>
      <View style={{ backgroundColor: '#2a84ff' }}>
        <XmyNav
          StatusBarColor="light-content"
          leftIconStyle={{ color: '#fff' }}
          onPress={() => {
            navigation.goBack();
          }}
          centerContent="获得分数"
          centerContentStyle={{ color: '#fff' }}
          rightContentStyle={{ color: '#fff' }}
        />
      </View>
      <View style={{ flex: 1, marginTop: pxToDp(10) }}>
        <View
          style={{
            height: pxToDp(50),
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: pxToDp(20),
              color: '#333',
              marginLeft: pxToDp(16),
              fontWeight: '600',
            }}
          >
            分数列表Activity
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <FlatList data={activityGrade} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}
