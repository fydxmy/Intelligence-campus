import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableWithoutFeedback, StatusBar, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { pxToDp } from '../../utils';
import { debounce } from 'lodash';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userLogin } from './service';
import { useDispatch } from 'react-redux';
import { authTokenSlice } from '../../store/authToken.slice';
import { ASauthToken, storeData } from '../../asyncStorage';
import Toast from '../../components/ToastConfig';

const statusBarHeight = StatusBar.currentHeight;

interface LoginPropsType extends NativeStackScreenProps<any> {}
export default function Login(props: LoginPropsType) {
  const [phoneNumber, setPhoneNumber] = useState('13697010905');
  const [passWord, setpassWord] = useState('123456');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loginHandler = () => {
    console.log('aaaa');
    setLoading(true);
    userLogin({ phoneNumber, passWord })
      .then((res) => {
        const token = res.token;
        dispatch(authTokenSlice.actions.setToken(token));
        storeData(ASauthToken, token).then(() => {
          props.navigation.replace('TabBar');
        });
      })
      .catch(() => {
        Toast.error('登录请求失败！');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.page}>
      {/* 导航条 */}
      <View style={styles['nav-bar']}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      </View>
      {/* 江西工程学院LOGO */}
      <View style={styles['logo-container']}>
        <ImageBackground
          source={require('../../../public/imgs/jxgcxy_logo.jpg')}
          style={{ height: pxToDp(64), width: pxToDp(64) }}
        />
      </View>
      {/* 账号 */}
      <View style={styles['form-item']}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ width: '30%', fontSize: pxToDp(18), color: '#262626' }}> 账号</Text>
          <View style={{ width: '70%' }}>
            <TextInput
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              placeholder="手机号码"
              selectionColor="#262626"
              style={{
                height: pxToDp(44),
                fontSize: pxToDp(18),
                color: '#262626',
              }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#d9d9d9', height: pxToDp(1) }}></View>
      </View>
      {/* 密码输入框 */}
      <View style={styles['form-item']}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ width: '30%', fontSize: pxToDp(18), color: '#262626' }}> 密码</Text>
          <View style={{ width: '70%', height: pxToDp(55) }}>
            <TextInput
              value={passWord}
              secureTextEntry={true}
              selectionColor="#333333"
              onChangeText={setpassWord}
              style={{
                height: pxToDp(44),
                fontSize: pxToDp(18),
                color: '#262626',
              }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#d9d9d9', height: pxToDp(1) }}></View>
        {/* 登录按钮 */}
        <View style={{ marginTop: pxToDp(40) }}>
          <Button
            onPress={debounce(loginHandler, 300)}
            title="登 录"
            buttonStyle={{ height: pxToDp(50), backgroundColor: '#1890ff' }}
            titleStyle={{ fontSize: pxToDp(18), color: '#ffffff' }}
            disabled={!(phoneNumber.length && passWord.length)}
            loading={loading}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: pxToDp(16), color: '#1890ff' }}>
            <Text>找回密码</Text>
            <Text style={{ color: '#bfbfbf' }}> | </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate('Register', {});
              }}
            >
              <Text>注册账号</Text>
            </TouchableWithoutFeedback>
            <Text style={{ color: '#bfbfbf' }}> | </Text>
            <Text>遇到问题？</Text>
          </Text>
          <Text
            style={{
              fontSize: pxToDp(16),
              color: '#1890ff',
              marginTop: pxToDp(8),
            }}
          >
            《此APP仅用于毕业设计，不保护用户任何隐私》
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  'nav-bar': {
    height: pxToDp(50),
    marginTop: statusBarHeight,
  },
  'logo-container': {
    marginTop: pxToDp(10),
    alignItems: 'center',
  },
  'form-item': {
    paddingLeft: pxToDp(16),
    paddingRight: pxToDp(16),
    marginTop: pxToDp(60),
  },
  footer: {
    height: pxToDp(40),
    width: '100%',
    marginTop: pxToDp(290),
  },
});
