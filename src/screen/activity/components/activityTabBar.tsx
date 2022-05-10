import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import XmyIconFont from '../../../components/IconFont';
import { pxToDp } from '../../../utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { userInfoType } from '../../../types/requsetDataType';

interface ActivityTabBarPropsType {
  userInfo: Partial<userInfoType>;
}
export const ActivityTabBar = (props: ActivityTabBarPropsType) => {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const sutuoBarList = [
    {
      id: 1,
      title: '学分申请',
      iconName: 'jgvr',
      onPress: () => {},
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 4,
      title: '参与活动',
      iconName: 'jgvr',
      onPress: () => {},
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 5,
      title: '错过活动',
      iconName: 'jgvr',
      onPress: () => {},
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 2,
      title: '活动申请',
      iconName: 'jgvr',
      onPress: () => {
        navigation.navigate('StaticWebView', {
          pageName: '活动申请',
          uri: '/ApplyActivity',
        });
      },
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 3,
      title: '活动审核',
      iconName: 'jgvr',
      onPress: () => {
        navigation.navigate('AuditActivityPage', {
          userInfo: props.userInfo,
        });
      },
      iconStyle: { color: '#2a84ff' },
    },
  ];
  return (
    <View
      style={{
        height: pxToDp(80),
        backgroundColor: '#fff',
        borderRadius: pxToDp(10),
        marginTop: pxToDp(15),
        marginLeft: pxToDp(12),
        marginRight: pxToDp(12),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {sutuoBarList.map((item) => (
        <TouchableOpacity onPress={item.onPress} key={item.id}>
          <View
            style={{
              width: pxToDp(68),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <XmyIconFont name={item.iconName} style={{ fontSize: pxToDp(30), ...item.iconStyle }} />
            <Text style={{ fontSize: pxToDp(13) }}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
