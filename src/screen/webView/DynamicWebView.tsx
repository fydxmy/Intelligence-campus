import React, { useEffect, useRef } from 'react';
import { View, BackHandler, Platform } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import NavBar from '../../components/NavBar';
import { pxToDp } from '../../../src/utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type RootStackParamList = {
  Profile: { pageName?: JSX.Element; url: string; type?: 'url' | 'html' };
};
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function DynamicWebView(props: Props) {
  const { url, pageName } = props.route.params;
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavBar
        StatusBarColor="dark-content"
        navStyle={{
          backgroundColor: '#fff',
          borderBottomWidth: pxToDp(1),
          borderColor: '#eeeeee',
        }}
        centerNode={pageName}
      />

      <WebView
        ref={webview}
        source={{ uri: url }}
        onNavigationStateChange={(e) => {
          backButtonEnabled.current = e;
        }}
      />
    </View>
  );
}
