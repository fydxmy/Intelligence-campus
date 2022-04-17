import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import XmyNav from '../../components/xmyNav';
import { bgColordise } from '../../res/colorMap';
import { Button } from 'react-native-elements';
import { validatePassword, pxToDp } from '../../utils';
import { useToast } from 'react-native-styled-toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface RegisterPropsType extends NativeStackScreenProps<any> {}
export default function Register(props: RegisterPropsType) {
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');
  const { toast } = useToast();
  const registerHandler = () => {
    sendRegisterInfoHandler();
  };
  const sendRegisterInfoHandler = async () => {
    const passwordValid = validatePassword(password);
    if (!passwordValid) {
      toast({ message: '密码格式不正确' });
      setPassword('');
      return;
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: bgColordise }}>
      <View style={{ backgroundColor: '#1777ff' }}>
        <XmyNav
          StatusBarColor="light-content"
          leftIconStyle={{ color: '#fff' }}
          centerContent="用户注册"
          centerContentStyle={{ color: '#fff' }}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>

      <View
        style={{
          marginRight: pxToDp(16),
          marginLeft: pxToDp(16),
          backgroundColor: '#fff',
          marginTop: pxToDp(20),
          paddingBottom: pxToDp(30),
          borderRadius: pxToDp(10),
        }}
      >
        <View
          style={{
            paddingLeft: pxToDp(16),
            paddingRight: pxToDp(16),
            marginTop: pxToDp(20),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '30%', fontSize: pxToDp(18) }}> 昵称</Text>
            <View style={{ width: '70%', height: pxToDp(40) }}>
              <TextInput
                value={nickName}
                selectionColor="#333333"
                onChangeText={setNickName}
                style={{
                  height: pxToDp(44),
                  fontSize: pxToDp(18),
                  color: '#333333',
                }}
              />
            </View>
          </View>
          <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
        </View>

        <View
          style={{
            paddingLeft: pxToDp(16),
            paddingRight: pxToDp(16),
            marginTop: pxToDp(20),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '30%', fontSize: pxToDp(18) }}> 电话号码</Text>
            <View style={{ width: '70%', height: pxToDp(40) }}>
              <TextInput
                value={phoneNumber}
                keyboardType="phone-pad"
                selectionColor="#333333"
                maxLength={11}
                onChangeText={setPassword}
                style={{
                  height: pxToDp(44),
                  fontSize: pxToDp(18),
                  color: '#333333',
                }}
              />
            </View>
          </View>
          <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
        </View>

        <View
          style={{
            paddingLeft: pxToDp(16),
            paddingRight: pxToDp(16),
            marginTop: pxToDp(20),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '30%', fontSize: pxToDp(18) }}> 密码</Text>
            <View style={{ width: '70%', height: pxToDp(40) }}>
              <TextInput
                value={password}
                secureTextEntry={true}
                selectionColor="#333333"
                onChangeText={setPassword}
                style={{
                  height: pxToDp(44),
                  fontSize: pxToDp(18),
                  color: '#333333',
                }}
              />
            </View>
          </View>
          <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
          <Text style={{ color: '#737373' }}>请输入8至18为的由数字字母~!@#$%^&*的字符串</Text>
        </View>

        <View
          style={{
            paddingLeft: pxToDp(16),
            paddingRight: pxToDp(16),
            marginTop: pxToDp(20),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '30%', fontSize: pxToDp(18) }}> 重复密码</Text>
            <View style={{ width: '70%', height: pxToDp(40) }}>
              <TextInput
                value={againPassword}
                secureTextEntry={true}
                selectionColor="#333333"
                onChangeText={setAgainPassword}
                style={{
                  height: pxToDp(40),
                  fontSize: pxToDp(18),
                  color: '#333333',
                }}
              />
            </View>
          </View>
          <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
        </View>
        {password === againPassword ? (
          <></>
        ) : (
          <View style={{ marginLeft: pxToDp(16) }}>
            <Text style={{ color: 'red' }}>两个输入的密码不一致</Text>
          </View>
        )}

        {/* 登录按钮 */}
        <View
          style={{
            marginTop: pxToDp(40),
            marginRight: pxToDp(16),
            marginLeft: pxToDp(16),
          }}
        >
          <Button
            onPress={registerHandler}
            title="注册"
            buttonStyle={{ height: pxToDp(50) }}
            titleStyle={{ fontSize: pxToDp(18) }}
            disabled={
              !(
                phoneNumber.length !== 0 &&
                password.length !== 0 &&
                nickName.length !== 0 &&
                againPassword.length !== 0
              )
            }
          />
          <View style={{ alignItems: 'center', marginTop: pxToDp(7) }}>
            <Text>
              注册就代表您同意掌上智慧校园的
              <Text style={{ color: '#1777ff' }}>《用户协议》</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
