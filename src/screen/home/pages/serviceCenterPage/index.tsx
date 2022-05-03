import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';
import XmyNav from '../../../../components/xmyNav';
import XmyIconFont from '../../../../components/IconFont';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface ServiceCenterPagePropsType extends NativeStackScreenProps<any> {}
export const ServiceCenterPage = (props: ServiceCenterPagePropsType) => {
  const payList = [
    {
      title: '考试成绩查询中心',
      list: [
        {
          id: 1,
          textName: '计算机等级',
          iconName: 'xuefei',
          iconStyle: { color: '#fdab17' },
          onPress: () => {
            props.navigation.navigate('XmyWebView', {
              url: 'http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=300',
              pageName: '计算机等级',
            });
          },
        },
        {
          id: 2,
          textName: '英语四六级',
          iconName: 'zhengshu',
          iconStyle: { color: '#fdab17' },
          onPress: () => {
            props.navigation.navigate('XmyWebView', {
              url: 'http://cjcx.neea.edu.cn/html1/folder/21045/4883-1.htm',
              pageName: '英语四六级',
            });
          },
        },
        {
          id: 3,
          textName: '自考成绩',
          iconName: 'xueli',
          iconStyle: { color: '#2a84ff' },
          onPress: () => {
            props.navigation.navigate('XmyWebView', {
              url: 'http://www.jxeea.cn/col/col26644/index.html',
              pageName: '自考成绩',
            });
          },
        },
        {
          id: 4,
          textName: '期末成绩',
          iconName: 'xueli',
          iconStyle: { color: '#2a84ff' },
        },
      ],
    },
    {
      title: '在校表现查询中心',
      list: [
        {
          id: 1,
          textName: '个人获奖',
          iconName: 'xuefei',
          iconStyle: { color: '#fdab17' },
        },
        {
          id: 2,
          textName: '素质考核',
          iconName: 'zhengshu',
          iconStyle: { color: '#fdab17' },
        },
        {
          id: 3,
          textName: '外宿记录',
          iconName: 'xueli',
          iconStyle: { color: '#2a84ff' },
        },
        {
          id: 4,
          textName: '处分信息',
          iconName: 'xueli',
          iconStyle: { color: '#2a84ff' },
        },
      ],
    },
    {
      title: '课程服务中心',
      list: [
        {
          id: 1,
          textName: '我的课程',
          iconName: 'xuefei',
          iconStyle: { color: '#fdab17' },
        },
        {
          id: 2,
          textName: '在线选课',
          iconName: 'zhengshu',
          iconStyle: { color: '#fdab17' },
        },
      ],
    },
    {
      title: '其它信息服务中心',
      list: [
        {
          id: 1,
          textName: '班主任测评',
          iconName: 'xuefei',
          iconStyle: { color: '#fdab17' },
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
          centerContent="服务中心"
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
            marginLeft: pxToDp(12),
            marginRight: pxToDp(12),
            borderRadius: pxToDp(10),
            marginBottom: pxToDp(15),
            paddingBottom: pxToDp(15),
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
            <Text style={{ fontSize: pxToDp(17), fontWeight: '600' }}>{item1.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: pxToDp(12),
              paddingLeft: pxToDp(12),
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {item1.list.map((item, index, array) => (
              <TouchableWithoutFeedback key={item.id} onPress={item.onPress}>
                <View
                  style={{
                    height: pxToDp(100),
                    width: pxToDp(72.6),
                    backgroundColor: '#f6f9fe',
                    alignItems: 'center',
                    marginRight: index == array.length - 1 ? 0 : pxToDp(12),
                    borderRadius: pxToDp(6),
                  }}
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
                      fontSize: pxToDp(13),
                      fontWeight: '500',
                      marginTop: pxToDp(5),
                      color: '#333333',
                    }}
                  >
                    {item.textName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
