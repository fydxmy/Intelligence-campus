import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ASauthToken, storeData } from '../../../../asyncStorage';
import XmyNav from '../../../../components/xmyNav';
import { navigationType } from '../../../../types/navigationType';
import { pxToDp } from '../../../../utils';
import Toast from '../../../../components/ToastConfig';

export const Setpage = (props: navigationType) => {
  const quitLogin = async () => {
    storeData(ASauthToken, '').then((res) => {
      console.log(res);
      props.navigation.reset({
        index: 1,
        routes: [{ name: 'Login' }],
      });
      Toast.success('退出登录成功');
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#ffffff' }}>
        <XmyNav StatusBarColor="dark-content" centerContent="设置" onPress={() => props.navigation.goBack()} />
      </View>

      <View style={{ marginTop: pxToDp(20) }}>
        <Pressable onPress={quitLogin}>
          <View
            style={{
              height: pxToDp(48),
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: pxToDp(17.5) }}>退出登录</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
