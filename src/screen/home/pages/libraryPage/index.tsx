import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import XmyIconFont from '../../../../components/IconFont';
import XmyNav from '../../../../components/xmyNav';
import { pxToDp } from '../../../../utils';

interface LibraryPagePropsType extends NativeStackScreenProps<any> {}
export function LibraryPage(props: LibraryPagePropsType) {
  const bathList = [
    {
      id: 1,
      textName: '图书搜索',
      iconName: 'fangjian',
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 2,
      textName: '扫码借书',
      iconName: 'sousuo',
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 3,
      textName: '图书续借',
      iconName: 'duankai',
      iconStyle: { color: '#fd600f' },
    },
    {
      id: 4,
      textName: '财经记录',
      iconName: 'kaishi',
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 5,
      textName: '借阅规则',
      iconName: 'sutuo',
      iconStyle: { color: '#fd600f' },
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#2a84ff' }}>
        <XmyNav
          StatusBarColor="light-content"
          leftIconStyle={{ color: '#fff' }}
          onPress={() => {
            props.navigation.goBack();
          }}
          centerContent="图书馆"
          centerContentStyle={{ color: '#fff' }}
          rightContentStyle={{ color: '#fff' }}
        />
      </View>

      <View
        style={{
          height: pxToDp(90),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: pxToDp(12),
          marginRight: pxToDp(12),
        }}
      >
        {bathList.map((item) => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: pxToDp(60),
              height: '100%',
            }}
            key={item.id}
          >
            <XmyIconFont name={item.iconName} style={{ fontSize: pxToDp(34), ...item.iconStyle }} />
            <Text style={{ fontSize: pxToDp(12), color: '#333333' }}>{item.textName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
