import React, { useEffect, useRef } from 'react';
import { View, BackHandler, Platform, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import NavBar from '../../components/NavBar';
import { pxToDp } from '../../utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { storeUserInfo } from '../../store/userInfo.slice';
import { storeToken } from '../../store/authToken.slice';
import { storeStudentStatus } from '../../store/studentStatus.slice';
type RootStackParamList = {
  Profile: { pageName?: JSX.Element; uri: string };
};
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function StaticWebView(props: Props) {
  const { uri, pageName } = props.route.params;
  const webview = useRef<any>();
  let backButtonEnabled = useRef<WebViewNavigation>();
  const onBackAndroid = () => {
    if (backButtonEnabled.current?.canGoBack) {
      webview.current.goBack();
    } else {
      props.navigation.goBack();
    }
    return true;
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    }
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const token = useSelector(storeToken);
  const userInfo = JSON.stringify(useSelector(storeUserInfo));
  const studentStatus = JSON.stringify(useSelector(storeStudentStatus));
  const injectedJavaScriptStr = `localStorage.setItem('token', '${token}');localStorage.setItem('userInfo', '${userInfo}');localStorage.setItem('studentStatus', '${studentStatus}');`;
  console.log(injectedJavaScriptStr);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavBar
        StatusBarColor="dark-content"
        navStyle={{
          backgroundColor: '#fff',
          borderBottomWidth: pxToDp(1),
          borderColor: '#eeeeee',
        }}
        centerNode={<Text style={{ fontSize: pxToDp(18), color: '#333333' }}>{pageName}</Text>}
      />

      <WebView
        ref={webview}
        source={{
          uri:
            Platform.OS === 'android'
              ? `file:///android_asset/staticWeb/index.html#${uri}`
              : `Static.bundle/staticWeb/index.html#${uri}`,
        }}
        onNavigationStateChange={(e) => {
          backButtonEnabled.current = e;
        }}
        injectedJavaScript={injectedJavaScriptStr}
      />
    </View>
  );
}
