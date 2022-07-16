import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import XmyIconFont from '../../../components/IconFont';
import { pxToDp } from '../../../utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { storeAuthData } from '../../../store/authData.slice';

interface Props {}
export const ActivityTabBar = () => {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const authData = useSelector(storeAuthData);
  console.log(authData, 'bbb');
  const sutuoBarList = [
    {
      id: 1,
      title: '获得分数',
      iconName: 'chengji',
      onPress: () => {
        navigation.navigate('ActivityGrade');
      },
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
      iconName: 'xueji',
      hiedden: authData.role !== 2,
      onPress: () => {
        navigation.navigate('AuditActivity');
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
        <View key={item.id}>
          {item.hiedden ? undefined : (
            <>
              <TouchableOpacity onPress={item.onPress}>
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
            </>
          )}
        </View>
      ))}
    </View>
  );
};
