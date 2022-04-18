import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import XmyNav from '../../../../components/xmyNav';
import XmyIconFont from '../../../../components/IconFont';

import { bgColordise } from '../../../../res/colorMap';
import { pxToDp } from '../../../../utils';
import { AVATAR_URI } from '../../../../utils/pathMap';
import { storeUserInfo } from '../../../../store/userInfo.slice';
import { useSelector } from 'react-redux';

export const UserInfoEdit = (props: any) => {
  const userInfo = useSelector(storeUserInfo).useInfoData;
  const userInfoList = [
    {
      id: 1,
      title: '昵称',
      content: userInfo.nickName,
      onPress: () => {
        props.navigation.navigate('SetNickName', {
          content: userInfo.nickName,
        });
      },
    },
    { id: 2, title: '性别', content: userInfo.gender == 1 ? '男' : '女' },
    { id: 3, title: '地区', content: userInfo.jiguan },
    {
      id: 4,
      title: '个性签名',
      content: userInfo.selfIntroduction,
      onPress: () => {
        props.navigation.navigate('SetSelfIntroduction', {
          content: userInfo.selfIntroduction,
        });
      },
    },
    { id: 5, title: '电话', content: userInfo.phoneNumber },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: bgColordise }}>
      <View style={{ backgroundColor: '#fff' }}>
        <XmyNav
          StatusBarColor="default"
          onPress={() => {
            props.navigation.goBack();
          }}
          centerContent="个人信息"
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <View
              style={{
                height: pxToDp(50),
                width: pxToDp(375),
                backgroundColor: 'pink',
              }}
            ></View>
          }
        >
          <View style={{ marginTop: pxToDp(20) }}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate('SetAvator', {
                  content: userInfo.avatar,
                });
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingLeft: pxToDp(16),
                  paddingRight: pxToDp(16),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: pxToDp(6),
                    paddingBottom: pxToDp(6),
                  }}
                >
                  <View>
                    <Text style={{ fontSize: pxToDp(16) }}>头像</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: AVATAR_URI + userInfo.avatar }}
                      style={{
                        width: pxToDp(60),
                        height: pxToDp(60),
                        borderRadius: pxToDp(6),
                        marginRight: pxToDp(8),
                      }}
                    />
                    <XmyIconFont name="qianjin" style={{ color: '#b2b2b2', fontSize: pxToDp(20) }} />
                  </View>
                </View>
                <View style={{ height: pxToDp(1), backgroundColor: '#eee' }}></View>
              </View>
            </TouchableWithoutFeedback>

            {userInfoList.map((item) => (
              <TouchableWithoutFeedback key={item.id} onPress={item.onPress}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: pxToDp(16),
                    paddingRight: pxToDp(16),
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: pxToDp(16),
                      paddingBottom: pxToDp(16),
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: pxToDp(16) }}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: pxToDp(250), alignItems: 'flex-end' }}>
                        <Text
                          style={{
                            fontSize: pxToDp(16),
                            marginRight: pxToDp(8),
                            color: '#737373',
                          }}
                        >
                          {item.content}
                        </Text>
                      </View>
                      <XmyIconFont name="qianjin" style={{ color: '#b2b2b2', fontSize: pxToDp(20) }} />
                    </View>
                  </View>
                  <View style={{ height: pxToDp(1), backgroundColor: '#eee' }}></View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
