import React, { Component } from 'react';
import { View, Text } from 'react-native';
import XmyNav from '../../../../components/xmyNav';
import XmyIconFont from '../../../../components/IconFont';
import { pxToDp } from '../../../../utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface PayCenterPageType extends NativeStackScreenProps<any> {}
export const PayCenterPage = (props: PayCenterPageType) => {
  const payList = [
    {
      tuitionTitle: '学杂费缴纳',
      tuition: [
        {
          id: 1,
          textName: '学杂费',
          iconName: 'xuefei',
          iconStyle: { color: '#fdab17' },
        },
        {
          id: 2,
          textName: '证书',
          iconName: 'zhengshu',
          iconStyle: { color: '#fdab17' },
        },
        {
          id: 3,
          textName: '学历',
          iconName: 'xueli',
          iconStyle: { color: '#2a84ff' },
        },
      ],
    },
    {
      tuitionTitle: '生活缴纳',
      tuition: [
        {
          id: 1,
          textName: '水费',
          iconName: 'shuifei',
          iconStyle: { color: '#2a84ff' },
        },
        {
          id: 2,
          textName: '电费',
          iconName: 'dianfei',
          iconStyle: { color: '#ff8f21' },
        },
      ],
    },
    {
      tuitionTitle: '其他缴费',
      tuition: [
        {
          id: 1,
          textName: '澡币A',
          iconName: 'zaobiA',
          iconStyle: { color: '#2a84ff' },
        },
        {
          id: 2,
          textName: '澡币B',
          iconName: 'zaobiB',
          iconStyle: { color: '#00b6ff' },
        },
      ],
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#2a84ff', marginBottom: pxToDp(20) }}>
        <XmyNav
          StatusBarColor="light-content"
          leftIconStyle={{ color: '#fff' }}
          centerContent="缴费中心"
          centerContentStyle={{ color: '#fff' }}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      {payList.map((item1, index1) => (
        <View
          style={{
            backgroundColor: '#ffffff',
            height: pxToDp(180),
            marginLeft: pxToDp(12),
            marginRight: pxToDp(12),
            borderRadius: pxToDp(10),
            marginBottom: pxToDp(15),
          }}
          key={index1}
        >
          <View
            style={{
              marginTop: pxToDp(8),
              marginBottom: pxToDp(8),
              marginLeft: pxToDp(10),
            }}
          >
            <Text style={{ fontSize: pxToDp(17), fontWeight: '600' }}>{item1.tuitionTitle}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: pxToDp(12),
              paddingLeft: pxToDp(12),
              justifyContent: 'flex-start',
            }}
          >
            {item1.tuition.map((item, index, array) => (
              <View
                style={{
                  height: pxToDp(120),
                  width: pxToDp(100.6),
                  backgroundColor: '#f6f9fe',
                  alignItems: 'center',
                  marginRight: pxToDp(12),
                  borderRadius: pxToDp(6),
                }}
                key={item.id}
              >
                <XmyIconFont
                  name={item.iconName}
                  style={{
                    fontSize: pxToDp(30),
                    marginTop: pxToDp(20),
                    ...item.iconStyle,
                  }}
                />
                <Text
                  style={{
                    fontSize: pxToDp(15),
                    fontWeight: '500',
                    marginTop: pxToDp(5),
                  }}
                >
                  {item.textName}
                </Text>
                <View
                  style={{
                    backgroundColor: '#2a84ff',
                    borderRadius: pxToDp(10),
                    paddingTop: pxToDp(2),
                    paddingBottom: pxToDp(3),
                    paddingLeft: pxToDp(10),
                    paddingRight: pxToDp(10),
                    alignItems: 'center',
                    marginTop: pxToDp(8),
                  }}
                >
                  <Text
                    style={{
                      fontSize: pxToDp(13),
                      color: '#fff',
                      fontWeight: '600',
                    }}
                  >
                    立即缴费
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
