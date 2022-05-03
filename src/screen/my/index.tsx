import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../utils';
import IconFont from '../../components/IconFont';
import { AVATAR_URI } from '../../config/index';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { storeUserInfo } from '../../store/userInfo.slice';
import styles from './style';
import Alarm from '../../utils/svg/alarm.svg';
import Male from '../../utils/svg/male.svg';
import Female from '../../utils/svg/female.svg';

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

export function My() {
  const property = useRef([
    { name: '素扩分', score: '110' },
    { name: '澡币A', score: '19.02' },
    { name: '澡币B', score: '12.62' },
  ]);
  const menuList = useRef([
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
  ]);

  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const userInfo = useSelector(storeUserInfo);
  return (
    <View style={styles.page}>
      <View style={styles.hearder}>
        <View style={styles['nav-bar']}>
          <View style={styles['nav-bar-right']}>
            <Alarm width={25} height={25} />
          </View>
        </View>
        <View style={styles['user-card']}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserInfo');
            }}
          >
            <View style={styles['card-left']}>
              <Image source={{ uri: AVATAR_URI + userInfo?.avatar }} style={styles['card-left-img']} />
              <View style={styles['card-left-userinfo']}>
                <Text style={styles['card-left-nickName']}>{userInfo?.nickName}</Text>
                <Text>
                  <View style={styles['card-left-sencondary']}>{userInfo?.gender === 1 ? <Male /> : <Female />}</View>
                  <View>
                    <Text style={styles['card-left-sencondaryText']}>{userInfo?.age} </Text>
                  </View>
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles['card-right']}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserInfoEdit');
              }}
            >
              <Text style={styles['card-right-button']}>编辑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 素拓分，造币 */}
      <View style={styles.property}>
        <View style={styles['property-header']}>
          <View>
            <Text style={styles['property-title']}>我的资产</Text>
          </View>
        </View>
        <View style={styles['property-body']}>
          {property.current.map((item, index) => (
            <TouchableOpacity
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
                  borderRadius: 5,
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontSize: pxToDp(19), color: '#333333' }}>{item.score}</Text>
                <Text style={{ fontSize: pxToDp(12), color: '#333333' }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
        {menuList.current.map((item, index) => (
          <TouchableOpacity onPress={item.onPress} key={index}>
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
                {/* <Text>{item.icon}</Text> */}
                <IconFont style={{ fontSize: pxToDp(26), ...item.iconStyle }} name={item.icon} />
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
                <IconFont style={{ color: '#cecece', fontSize: pxToDp(17) }} name="qianwang" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
