import React from 'react';
import { View, Text, StatusBar, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { pxToDp } from '../../utils';
import XmyIconFont from '../../components/IconFont';
import { AVATAR_URI } from '../../utils/pathMap';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { storeUserInfo } from '../../store/userInfo.slice';

export interface userInfoType {
  nickName: string;
  avatar: string;
  selfIntroduction: string | null;
  gender: number;
  role: string;
  age: number;
  campus: string;
  studentId: string;
  officialCertification: string;
}
const statusBarHeight = StatusBar.currentHeight;

export const My = () => {
  const detailList = [
    { name: '素扩分', score: '110' },
    { name: '澡币A', score: '19.02' },
    { name: '澡币B', score: '12.62' },
  ];
  const menuList = [
    {
      icon: 'xueji',
      text: '学籍',
      iconStyle: { color: '#2a84ff' },
      onPress: () => {
        navigation.navigate('StudyStatus');
      },
    },
    { icon: 'shoucang', text: '收藏', iconStyle: { color: '#ffab17' } },
    { icon: 'kebiao', text: '课表', iconStyle: { color: '#2a84ff' } },
    { icon: 'chengji', text: '成绩', iconStyle: { color: '#2a84ff' } },
  ];

  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const userInfo = useSelector(storeUserInfo).useInfoData;
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* hearder  */}
      <View style={{ backgroundColor: '#fff' }}>
        {/* 设置icon */}
        <View
          style={{
            marginTop: statusBarHeight,
            height: pxToDp(50),
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: pxToDp(18),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: pxToDp(90),
            }}
          >
            <XmyIconFont style={{ color: '#333333', fontSize: pxToDp(25) }} name="saoma" />
            <XmyIconFont
              style={{ color: '#333333', fontSize: pxToDp(25) }}
              name="shezhi"
              onPress={() => navigation.navigate('Setpage')}
            />
          </View>
        </View>

        <View
          style={{
            paddingLeft: pxToDp(22),
            paddingBottom: pxToDp(30),
            flexDirection: 'row',
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('UserInfo');
            }}
          >
            <View style={{ flexDirection: 'row', width: pxToDp(250) }}>
              <View>
                <Image
                  source={{ uri: AVATAR_URI + userInfo.avatar }}
                  style={{
                    width: pxToDp(60),
                    height: pxToDp(60),
                    borderRadius: pxToDp(6),
                  }}
                />
              </View>
              <View
                style={{
                  paddingLeft: pxToDp(18),
                  justifyContent: 'space-evenly',
                }}
              >
                <Text
                  style={{
                    fontSize: pxToDp(22),
                    fontWeight: '600',
                    color: '#040404',
                  }}
                >
                  {userInfo.nickName}
                </Text>
                <Text>
                  <Text style={{ color: '#333333' }}>
                    {userInfo.gender === 1 ? '男' : userInfo.gender === 0 ? '女' : ''}
                  </Text>
                  <Text style={{ color: '#333333' }}>{userInfo.age} </Text>
                  <Text style={{ color: '#333333' }}>{userInfo.campus}</Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('UserInfoEdit');
            }}
          >
            <View style={{ justifyContent: 'center', paddingLeft: pxToDp(30) }}>
              <Text>编辑</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* 素拓分，造币 */}
      <View
        style={{
          backgroundColor: '#fff',
          height: pxToDp(80),
          marginTop: pxToDp(10),
          marginLeft: pxToDp(12),
          marginRight: pxToDp(12),
          borderRadius: pxToDp(6),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {detailList.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigation.navigate('XmyWebView', {
                url: 'index.html',
                pageName: 'index',
                type: 'html',
              });
            }}
          >
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                elevation: 7,
                borderRadius: 5,
                // shadowColor: 'black',
                marginLeft: 10,
                // shadowOpacity: 0.1,
                // shadowRadius: StyleSheet.hairlineWidth,
                // shadowOffset: {
                //   height: StyleSheet.hairlineWidth,
                //   width: 0,
                // },
                // zIndex: 1,
              }}
            >
              <Text style={{ fontSize: pxToDp(19), color: '#333333' }}>{item.score}</Text>
              <Text style={{ fontSize: pxToDp(12), color: '#333333' }}>{item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      {/* 功能list */}
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: pxToDp(14),
          marginLeft: pxToDp(12),
          marginRight: pxToDp(12),
          borderRadius: pxToDp(6),
          paddingTop: pxToDp(3),
          paddingLeft: pxToDp(14),
          paddingRight: pxToDp(14),
        }}
      >
        {menuList.map((item, index) => (
          <TouchableWithoutFeedback onPress={item.onPress} key={index}>
            <View
              style={{
                height: pxToDp(50),
                borderBottomColor: '#eeeeee',
                borderBottomWidth: pxToDp(0.8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <XmyIconFont style={{ fontSize: pxToDp(26), ...item.iconStyle }} name={item.icon} />
                <Text
                  style={{
                    color: '#333333',
                    marginLeft: pxToDp(10),
                    fontSize: pxToDp(17),
                  }}
                >
                  {item.text}
                </Text>
              </View>
              <View>
                <XmyIconFont style={{ color: '#cecece', fontSize: pxToDp(17) }} name="qianwang" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};
