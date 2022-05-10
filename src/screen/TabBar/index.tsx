import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, BackHandler, ToastAndroid } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Home } from '../home';
import { My } from '../My';
import ActivityPage from '../activity';
import IconFont from '../../components/IconFont';
import { pxToDp } from '../../utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { verifyToken } from './service';
import Toast from '../../components/ToastConfig';
import { ASauthToken, getData } from '../../asyncStorage';
import { useDispatch } from 'react-redux';
import { authTokenSlice } from '../../store/authToken.slice';
import { userInfoSlice } from '../../store/userInfo.slice';
import { queryStudentStatus } from '../My/screen/StudyStatus/services';
import { studentStatusSlice } from '../../store/studentStatus.slice';

interface TabBarPropsType extends NativeStackScreenProps<any, any> {}

export const TabBar = (props: TabBarPropsType) => {
  const tabBarList = useRef([
    {
      selected: 'home',
      title: '首页',
      renderIcon: () => <IconFont name="shouye" style={{ fontSize: pxToDp(25), color: '#666666' }} />,
      renderSelectedIcon: () => <IconFont name="shouye" style={{ fontSize: pxToDp(25), color: '#1678ff' }} />,
      component: <Home />,
      onPress: () => setSelectedTab('home'),
    },
    {
      selected: 'activity',
      title: '素拓',
      renderIcon: () => <IconFont name="sutuo" style={{ fontSize: pxToDp(25), color: '#666666' }} />,
      renderSelectedIcon: () => <IconFont name="sutuo" style={{ fontSize: pxToDp(25), color: '#1678ff' }} />,
      component: <ActivityPage />,
      onPress: () => setSelectedTab('activity'),
    },
    {
      selected: 'my',
      title: '我的',
      renderIcon: () => <IconFont name="wode" style={{ fontSize: pxToDp(25), color: '#666666' }} />,
      renderSelectedIcon: () => <IconFont name="wode" style={{ fontSize: pxToDp(25), color: '#1678ff' }} />,
      component: <My />,
      onPress: () => setSelectedTab('my'),
    },
  ]);
  let lastBackPressed = useRef<number>(0);
  const [selectedTab, setSelectedTab] = useState('home');
  const StatusBarColor = ['my'].find((item) => item === selectedTab);
  const dispatch = useDispatch();
  useEffect(() => {
    authToken();
    //再按一次退出应用
    BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authToken = async () => {
    // 获取token
    getData(ASauthToken).then((token) => {
      dispatch(authTokenSlice.actions.setToken(token));
      verifyToken()
        .then((res) => {
          dispatch(userInfoSlice.actions.setUserInfo(res.userInfo));
          queryStudentStatus().then((res) => {
            dispatch(studentStatusSlice.actions.setStudentStatus(res.studentStatus));
          });
        })
        .catch((res) => {
          if (res.code !== 0) {
            Toast.error('登录失败', '身份信息失效，请重新登录');
            props.navigation.navigate('Login');
          }
        });
    });
  };
  const onBackAndroid = () => {
    if (props.navigation.isFocused()) {
      if (lastBackPressed.current && lastBackPressed.current + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return false;
      }
      lastBackPressed.current = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={StatusBarColor ? 'dark-content' : 'light-content'}
      />
      <TabNavigator tabBarStyle={{ backgroundColor: '#fafbff', height: pxToDp(56) }}>
        {tabBarList.current.map((item, index) => {
          return (
            <TabNavigator.Item
              selected={selectedTab === item.selected}
              title={item.title}
              renderIcon={item.renderIcon}
              renderSelectedIcon={item.renderSelectedIcon}
              onPress={item.onPress}
              titleStyle={{
                fontSize: pxToDp(12),
                position: 'relative',
                top: pxToDp(-3),
                color: '#666666',
              }}
              tabStyle={{
                backgroundColor: '#fafbff',
                justifyContent: 'center',
                paddingTop: pxToDp(8),
              }}
              selectedTitleStyle={{ color: '#1678ff' }}
              key={index}
            >
              {item.component}
            </TabNavigator.Item>
          );
        })}
      </TabNavigator>
    </View>
  );
};
