import React, { useEffect, useState } from 'react';
import { View, StatusBar, BackHandler, ToastAndroid } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Home } from './screen/home';
import { My } from './screen/my';
import ActivityPage from './screen/activity';
import XmyIconFont from './components/xmyIconFont';
import { pxToDp } from './utils';
import { useFetchHttp } from './utils';

import { VERIFY_URI } from './utils/pathMap';
import { useToast } from 'react-native-styled-toast';
import { userInfoType, verifyType } from './types/requsetDataType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { userInfoActions } from './store/userInfo.slice';
import { ASuserInfoMap, getData } from './asyncStorage';
import { asyncDispatch } from './types/asyncDispatch';

interface TabBarPropsType extends NativeStackScreenProps<any, any> {}

export const TabBar = (props: TabBarPropsType) => {
  const tabBarList = [
    {
      selected: 'home',
      title: '首页',
      renderIcon: () => <XmyIconFont name="shouye" style={{ fontSize: pxToDp(25), color: '#666666' }} />,
      renderSelectedIcon: () => <XmyIconFont name="shouye" style={{ fontSize: pxToDp(25), color: '#1678ff' }} />,
      component: <Home />,
      onPress: () => setSelectedTab('home'),
    },
    {
      selected: 'activity',
      title: '素拓',
      renderIcon: () => <XmyIconFont name="sutuo" style={{ fontSize: pxToDp(25), color: '#666666' }} />,
      renderSelectedIcon: () => <XmyIconFont name="sutuo" style={{ fontSize: pxToDp(25), color: '#1678ff' }} />,
      component: <ActivityPage />,
      onPress: () => setSelectedTab('activity'),
    },
    {
      selected: 'my',
      title: '我的',
      renderIcon: () => <XmyIconFont name="wode" style={{ fontSize: pxToDp(25), color: '#666666' }} />,
      renderSelectedIcon: () => <XmyIconFont name="wode" style={{ fontSize: pxToDp(25), color: '#1678ff' }} />,
      component: <My />,
      onPress: () => setSelectedTab('my'),
    },
  ];
  let lastBackPressed: number;
  const [selectedTab, setSelectedTab] = useState('home');
  const StatusBarColor = ['my'].find((item) => item === selectedTab);
  const client = useFetchHttp();
  const { toast } = useToast();
  const dispatch: asyncDispatch<userInfoType> = useDispatch();
  useEffect(() => {
    authToken();
    setStoreuserInfo();
    //再按一次退出应用
    BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authToken = async () => {
    client(VERIFY_URI, { reqMethod: 'POST' }).then((data: verifyType) => {
      if (!data.isLogin) {
        toast({ message: '身份信息失效，请重新登录' });
        props.navigation.navigate('Login');
      }
    });
  };
  const setStoreuserInfo = async () => {
    const ASuserinfo = await getData(ASuserInfoMap.keyName);
    if (ASuserinfo) {
      dispatch(userInfoActions.setUserInfo(JSON.parse(ASuserinfo as string)));
    }
  };
  const onBackAndroid = () => {
    if (props.navigation.isFocused()) {
      if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return false;
      }
      lastBackPressed = Date.now();
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
        {tabBarList.map((item, index) => {
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
