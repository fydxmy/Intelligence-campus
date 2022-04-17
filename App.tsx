import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-native-styled-toast';
import { store } from './src/store';
import Nav from './src/stackNavigator';
import SplashScreen from 'react-native-splash-screen';
import theme from './theme';
import { useRef } from 'react';

export default () => {
  let timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    timer.current = setTimeout(() => {
      // 隐藏启动页
      SplashScreen.hide();
    }, 1);
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        {/* 做弹出层的react-native-styled-toast定义主题 */}
        <ThemeProvider theme={theme}>
          <ToastProvider maxToasts={3}>
            <Nav />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </View>
  );
};
