import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import XmyNav from '../../../../../../components/xmyNav';
import { bgColordise } from '../../../../../../res/colorMap';
import { Button } from 'react-native-elements';
import { pxToDp } from '../../../../../../utils/stylesKits';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { updateUserInfo } from '../../services';
import { userInfoSlice } from '../../../../../../store/userInfo.slice';
import Toast from '../../../../../../components/ToastConfig';

interface SetSelfIntroductionPropsType
  extends NativeStackScreenProps<{ UserInfoEdit: { content: string } }, 'UserInfoEdit'> {}
export const SetSelfIntroduction = (props: SetSelfIntroductionPropsType) => {
  const beforeContent = props.route.params.content;
  const [content, setContent] = useState(props.route.params.content);
  const dispatch = useDispatch();

  const setUserInfo = async () => {
    updateUserInfo({ selfIntroduction: content }).then((res) => {
      console.log(JSON.stringify(res.userInfo));
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
          centerContent="更改个性签名"
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
        <View
          style={{
            paddingLeft: pxToDp(16),
            paddingRight: pxToDp(16),
            backgroundColor: '#fff',
            marginLeft: pxToDp(16),
            marginRight: pxToDp(16),
            borderRadius: pxToDp(10),
            paddingBottom: pxToDp(10),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextInput
              value={content}
              onChangeText={setContent}
              multiline={true}
              style={{
                height: pxToDp(300),
                width: '100%',
                fontSize: pxToDp(16),
                color: '#333333',
                paddingTop: pxToDp(18),
                paddingBottom: pxToDp(4),
                textAlign: 'left',
                textAlignVertical: 'top',
              }}
            />
          </View>
          <View style={{ height: pxToDp(1), backgroundColor: '#e5e5e5' }}></View>
          <Text style={{ color: '#737373', marginTop: pxToDp(8) }}>个性签名</Text>
        </View>
      </View>
    </View>
  );
};
