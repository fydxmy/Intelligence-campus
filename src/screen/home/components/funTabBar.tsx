import { View, Text, TouchableOpacity } from 'react-native';
import XmyIconFont from '../../../components/IconFont';
import { pxToDp } from '../../../utils';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';

export const FunTabBar = () => {
  const functionItemList = [
    {
      id: 1,
      iconName: 'jgvr',
      textContent: '江工VR',
      iconStyle: { color: '#fd600f' },
      onPress: () => {
        navigation.navigate('XmyWebView', {
          url: 'https://720yun.com/t/9dvktbrlrfq?scene_id=77400713',
          pageName: '江工VR',
        });
      },
    },
    {
      id: 2,
      iconName: 'jiaofei',
      textContent: '缴费中心',
      iconStyle: { color: '#ffab17' },
      onPress: () => {
        navigation.navigate('PayCenterPage');
      },
    },
    {
      id: 3,
      iconName: 'fuwuzhongxin',
      textContent: '服务中心',
      iconStyle: { color: '#2a84ff' },
      onPress: () => {
        navigation.navigate('ServiceCenterPage');
      },
    },
    {
      id: 4,
      iconName: 'xuexizhongxin',
      textContent: '学习中心',
      iconStyle: { color: '#00b6ff' },
      onPress: () => {
        navigation.navigate('XmyWebView', {
          url: 'https://www.icourse163.org',
          pageName: '学习中心',
        });
      },
    },
    {
      id: 5,
      iconName: 'tushuguan',
      textContent: '图书馆',
      iconStyle: { color: '#2a84ff' },
      onPress: () => {
        navigation.navigate('LibraryPage');
      },
    },
    {
      id: 6,
      iconName: 'xizao',
      textContent: '洗澡',
      iconStyle: { color: '#2a84ff' },
      onPress: () => {
        navigation.navigate('BathPage');
      },
    },
    {
      id: 7,
      iconName: 'xiyiji',
      textContent: '洗衣机',
      iconStyle: { color: '#2a84ff' },
      onPress: () => {
        navigation.navigate('WasherPage');
      },
    },
    {
      id: 8,
      iconName: 'guzhang',
      textContent: '故障报修',
      iconStyle: { color: '#2a84ff' },
      onPress: () => {
        navigation.navigate('MalfunctionPage');
      },
    },
  ];
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  return (
    <View>
      <View
        style={{
          paddingRight: pxToDp(18),
          paddingLeft: pxToDp(18),
          flexDirection: 'row',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          height: pxToDp(140),
        }}
      >
        {functionItemList.map((item) => (
          <TouchableOpacity onPress={item.onPress} key={item.id}>
            <View
              style={{
                width: pxToDp(67.8),
                height: pxToDp(67.8),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <XmyIconFont name={item.iconName} style={{ fontSize: pxToDp(40), ...item.iconStyle }} />
              <Text
                style={{
                  fontSize: pxToDp(12),
                  color: '#333333',
                  marginTop: pxToDp(5),
                }}
              >
                {item.textContent}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
