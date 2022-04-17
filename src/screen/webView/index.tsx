import React, { useEffect, useMemo, useRef } from 'react';
import { View, BackHandler, Platform } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import XmyNav from '../../components/xmyNav';
import { pxToDp } from '../../../src/utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type RootStackParamList = {
  Profile: { pageName: string; url: string; type?: 'url' | 'html' };
};
type PropsType = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const XmyWebView = (props: PropsType) => {
  const { url, pageName, type } = props.route.params;
  const webview = useRef<any>();
  let backButtonEnabled = useRef<WebViewNavigation>();
  const onBackAndroid = () => {
    console.log(backButtonEnabled.current, '222');
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
  const source = useMemo(() => {
    if (type === 'html') {
      return {
        uri: Platform.OS === 'android' ? `file:///android_asset/static/${url}` : 'Static.bundle/index.html',
        baseUrl: '',
      };
    }
    return { uri: url };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <XmyNav
        StatusBarColor="dark-content"
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{
          backgroundColor: '#fff',
          borderBottomWidth: pxToDp(1),
          borderColor: '#eeeeee',
        }}
        centerContent={pageName}
      />

      <WebView
        ref={webview}
        source={source}
        onNavigationStateChange={(e) => {
          backButtonEnabled.current = e;
        }}
      />
    </View>
  );
};
