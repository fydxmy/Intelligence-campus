import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../screen/Login';
import Register from '../screen/Register';

import { TabBar } from '../screen/TabBar';
// import { UserInfo } from '../screen/My/screen/userInfo';
import { UserInfoEdit } from '../screen/My/screen';
// import { Setpage, StudyStatus, UserInfo, UserInfoEdit } from './pages/My/pages';
import { XmyWebView } from '../screen/webView';
import DynamicWebView from '../screen/webView/DynamicWebView';

import {
  BathPage,
  LibraryPage,
  MalfunctionPage,
  PayCenterPage,
  ServiceCenterPage,
  WasherPage,
} from '../screen/home/pages';

// import {
//   SetNickName,
//   SetSelfIntroduction,
//   SetAvator,
// } from './pages/My/pages/userInfoEdit/pages';

// import {
//   AuditDetailsPage,
//   ActivityDetailsPage,
//   ApplyActivityPage,
//   AuditActivityPage,
// } from './pages/activity/pages';

const Stack = createStackNavigator();
export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabBar">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen name="TabBar" component={TabBar} />
        {/* <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        /> */}
        <Stack.Screen
          name="XmyWebView"
          component={XmyWebView}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="DynamicWebView"
          component={DynamicWebView}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen name="BathPage" component={BathPage} />
        <Stack.Screen name="LibraryPage" component={LibraryPage} />
        <Stack.Screen name="MalfunctionPage" component={MalfunctionPage} />
        <Stack.Screen name="PayCenterPage" component={PayCenterPage} />
        <Stack.Screen name="ServiceCenterPage" component={ServiceCenterPage} />
        <Stack.Screen name="WasherPage" component={WasherPage} />
        <Stack.Screen
          name="UserInfoEdit"
          component={UserInfoEdit}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        {/*
        <Stack.Screen
          name="Setpage"
          component={Setpage}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="StudyStatus"
          component={StudyStatus}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="SetNickName"
          component={SetNickName}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="SetSelfIntroduction"
          component={SetSelfIntroduction}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="SetAvator"
          component={SetAvator}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
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
