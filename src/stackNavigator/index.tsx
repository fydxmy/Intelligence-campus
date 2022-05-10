import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../screen/Login';
import Register from '../screen/Register';

import { TabBar } from '../screen/TabBar';
import { UserInfo } from '../screen/My/screen/UserInfo';
import { UserInfoEdit, StudyStatus, Setpage } from '../screen/My/screen';
// import { Setpage, , UserInfo, UserInfoEdit } from './pages/My/pages';
import { XmyWebView } from '../screen/webView';
import DynamicWebView from '../screen/webView/DynamicWebView';
import StaticWebView from '../screen/webView/StaticWebView';

import {
  BathPage,
  LibraryPage,
  MalfunctionPage,
  PayCenterPage,
  ServiceCenterPage,
  WasherPage,
} from '../screen/home/pages';

import { SetNickName, SetGender, SetSelfIntroduction, SetAvator } from '../screen/My/screen/UserInfoEdit/screen';

// import {
//   AuditDetailsPage,
//   ActivityDetailsPage,
//   ApplyActivityPage,
//   AuditActivityPage,
// } from './pages/activity/pages';

const Stack = createStackNavigator();
export default function Nav() {
  const NavRouter = {
    Register,
    Login,
    TabBar,
    UserInfo,
    UserInfoEdit,
    SetNickName,
    SetSelfIntroduction,
    SetAvator,
    Setpage,
    SetGender,
    StudyStatus,
    BathPage,
    LibraryPage,
    MalfunctionPage,
    PayCenterPage,
    ServiceCenterPage,
    WasherPage,
    XmyWebView,
    DynamicWebView,
    StaticWebView,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabBar">
        {Object.keys(NavRouter).map((item, index) => {
          return (
            <Stack.Screen
              name={item}
              key={index}
              component={NavRouter[item]}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
          );
        })}
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen name="TabBar" component={TabBar} /> */}
        {/* <Stack.Screen
          name="XmyWebView"
          component={XmyWebView}
          options={{
            gestureEnabled: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="DynamicWebView"
          component={DynamicWebView}
          options={{
            gestureEnabled: false,
          }}
        /> */}

        {/*
        <Stack.Screen
          name="ActivityDetailsPage"
          component={ActivityDetailsPage}
        />
        <Stack.Screen name="AuditDetailsPage" component={AuditDetailsPage} />
        <Stack.Screen name="ApplyActivityPage" component={ApplyActivityPage} />

        <Stack.Screen name="AuditActivityPage" component={AuditActivityPage} /> */}
        {/* 修改用户信息page */}
        {/**/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
