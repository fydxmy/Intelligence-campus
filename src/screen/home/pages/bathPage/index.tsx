import React, { Component } from 'react';
import { View, Text } from 'react-native';
import XmyIconFont from '../../../../components/IconFont';
import XmyNav from '../../../../components/xmyNav';
import { pxToDp } from '../../../../utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface BathPagePropsType extends NativeStackScreenProps<any> {}
export function BathPage(props: BathPagePropsType) {
  const bathList = [
    {
      id: 1,
      textName: '房号用水',
      iconName: 'fangjian',
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 2,
      textName: '搜索设备',
      iconName: 'sousuo',
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 3,
      textName: '断开设备',
      iconName: 'duankai',
      iconStyle: { color: '#fd600f' },
    },
    {
      id: 4,
      textName: '开始洗澡',
      iconName: 'kaishi',
      iconStyle: { color: '#2a84ff' },
    },
    {
      id: 5,
      textName: '洗澡完毕',
      iconName: 'sutuo',
      iconStyle: { color: '#fd600f' },
    },
  ];
  const connectInfoList = [
    { id: 1, title: '连接提示：', content: '蓝牙未连接设备' },
    { id: 2, title: '本次消费：', content: '费用：0.000元' },
    { id: 3, title: 'GPS定位：', content: '未开启' },
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
          centerContent="洗澡"
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

      <View
        style={{
          marginLeft: pxToDp(12),
          marginRight: pxToDp(12),
          borderRadius: pxToDp(8),
          paddingLeft: pxToDp(12),
          paddingRight: pxToDp(12),
          backgroundColor: '#fff',
          paddingBottom: pxToDp(5),
          paddingTop: pxToDp(8),
        }}
      >
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: pxToDp(18),
              color: '#333333',
              fontWeight: '600',
            }}
          >
            连接信息
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: pxToDp(35),
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: pxToDp(15), color: '#333333' }}>用户账号： 1234567891</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: pxToDp(15), color: '#333333' }}>澡币A：999元</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: pxToDp(35),
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: pxToDp(15), color: '#333333' }}>连接寝室：KJY22#306</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: pxToDp(15), color: '#333333' }}>澡币B：0.0元</Text>
          </View>
        </View>

        {connectInfoList.map((item) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              height: pxToDp(35),
              alignItems: 'center',
            }}
            key={item.id}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: pxToDp(15), color: '#333333' }}>{item.title}</Text>
            </View>
            <View style={{ flex: 3, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: pxToDp(15),
                  color: 'red',
                  fontWeight: '600',
                }}
              >
                {item.content}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          marginLeft: pxToDp(12),
          marginRight: pxToDp(12),
          borderRadius: pxToDp(8),
          paddingLeft: pxToDp(12),
          paddingRight: pxToDp(12),
          backgroundColor: '#fff',
          paddingBottom: pxToDp(10),
          paddingTop: pxToDp(8),
          marginTop: pxToDp(15),
        }}
      >
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: pxToDp(18),
              color: '#333333',
              fontWeight: '600',
            }}
          >
            历史连接记录
          </Text>
        </View>

        <View style={{ marginTop: pxToDp(10) }}>
          <View
            style={{
              backgroundColor: '#00b6ff',
              width: pxToDp(240),
              height: pxToDp(30),
              justifyContent: 'center',
              borderRadius: pxToDp(6),
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>房号：仙女湖校区(四校)22栋3楼06</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
