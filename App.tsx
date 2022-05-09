import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Nav from './src/stackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { useRef } from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/ToastConfig';

export default () => {
  let timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    timer.current = setTimeout(() => {
      // 隐藏启动页
      SplashScreen.hide();
    }, 2000);
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <Nav />
        <Toast topOffset={70} position="top" type="error" config={toastConfig} />
      </Provider>
    </View>
  );
};
