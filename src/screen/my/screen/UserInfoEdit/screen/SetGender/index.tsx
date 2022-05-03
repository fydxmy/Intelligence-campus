import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import XmyNav from '../../../../../../components/xmyNav';
import { bgColordise } from '../../../../../../res/colorMap';
import { Button } from 'react-native-elements';
import { pxToDp } from '../../../../../../utils/stylesKits';
import Modal from 'react-native-modal';
// import { useFetchHttp } from '../../../../../../utils';
import { useDispatch } from 'react-redux';
// import { userInfoActions } from '../../../../../../store/userInfo.slice';
// import { ASuserInfoMap, storeData } from '../../../../../../asyncStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { updateUserInfo } from '../../services';
import { userInfoSlice } from '../../../../../../store/userInfo.slice';
import Toast from '../../../../../../components/ToastConfig';

interface SetNickNamePropsType extends NativeStackScreenProps<{ UserInfoEdit: { content: number } }, 'UserInfoEdit'> {}

export function SetGender(props: SetNickNamePropsType) {
  const beforeContent = props.route.params.content;
  const [content, setContent] = useState(props.route.params.content);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const setUserInfo = async () => {
    updateUserInfo({ gender: content }).then((res) => {
      dispatch(userInfoSlice.actions.setUserInfo(res.userInfo));
      Toast.success('修改成功');
      props.navigation.goBack();
    });
  };
  return (
    <View style={{ backgroundColor: bgColordise, flex: 1 }}>
      <View style={{ backgroundColor: '#fff' }}>
        <XmyNav
          StatusBarColor="dark-content"
          centerContent="更改昵称"
          onPress={() => {
            props.navigation.goBack();
          }}
          leftDOM={
            <Button
              title="保存"
              disabled={beforeContent === content ? true : false}
              buttonStyle={{
                height: pxToDp(30),
                paddingLeft: pxToDp(10),
                paddingRight: pxToDp(10),
                paddingTop: pxToDp(2),
                paddingBottom: pxToDp(2),
              }}
              onPress={setUserInfo}
            />
          }
        />
      </View>
      <View style={{ marginTop: pxToDp(10) }}>
        <View style={{ paddingLeft: pxToDp(16), paddingRight: pxToDp(16) }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  height: pxToDp(44),
                  width: '100%',
                  fontSize: pxToDp(16),
                  color: '#333333',
                  paddingTop: pxToDp(18),
                  paddingBottom: pxToDp(4),
                  marginLeft: pxToDp(20),
                }}
              >
                {content === 1 ? '男' : '女'}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ height: pxToDp(1), backgroundColor: '#e5e5e5' }}></View>
        </View>
      </View>
      <Modal isVisible={modalVisible} deviceWidth={pxToDp(375)} style={{ margin: 0 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f7f7f7',
            marginTop: pxToDp(670),
            borderRadius: pxToDp(10),
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setContent(1);
            }}
          >
            <View
              style={{
                borderColor: '#e5e5e5',
                borderBottomWidth: pxToDp(1),
                height: pxToDp(50),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ color: '#191919', fontSize: pxToDp(16) }}>男</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setContent(0);
            }}
          >
            <View
              style={{
                borderColor: '#e5e5e5',
                borderBottomWidth: pxToDp(1),
                height: pxToDp(50),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                marginBottom: pxToDp(10),
              }}
            >
              <Text style={{ color: '#191919', fontSize: pxToDp(16) }}>女</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
