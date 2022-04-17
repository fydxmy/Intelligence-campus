import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import XmyNav from '../../../../../../components/xmyNav';
import { bgColordise } from '../../../../../../res/colorMap';
import { Button } from 'react-native-elements';
import { pxToDp } from '../../../../../../utils/stylesKits';
import { USERINFOUPDATE_URL } from '../../../../../../utils/pathMap';
import { useFetchHttp } from '../../../../../../utils';
import { useDispatch } from 'react-redux';
import { userInfoActions } from '../../../../../../store/userInfo.slice';
import { ASuserInfoMap, storeData } from '../../../../../../asyncStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface SetNickNamePropsType extends NativeStackScreenProps<{ UserInfoEdit: { content: string } }, 'UserInfoEdit'> {}

export function SetNickName(props: SetNickNamePropsType) {
  const beforeContent = props.route.params.content;
  const [content, setContent] = useState(props.route.params.content);
  const client = useFetchHttp();
  const dispatch = useDispatch();

  const updateUserInfo = async () => {
    await client(USERINFOUPDATE_URL, {
      reqMethod: 'POST',
      data: {
        nickName: content,
      },
    })
      .then((data) => {
        dispatch(userInfoActions.setUserInfo(data));
        storeData(ASuserInfoMap.keyName, data);
      })
      .finally(() => {});
    props.navigation.goBack();
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
              disabled={beforeContent == content ? true : false}
              buttonStyle={{
                height: pxToDp(30),
                paddingLeft: pxToDp(10),
                paddingRight: pxToDp(10),
                paddingTop: pxToDp(2),
                paddingBottom: pxToDp(2),
              }}
              onPress={updateUserInfo}
            />
          }
        />
      </View>
      <View style={{ marginTop: pxToDp(10) }}>
        <View style={{ paddingLeft: pxToDp(16), paddingRight: pxToDp(16) }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextInput
              value={content}
              onChangeText={(content) => {
                setContent(content);
              }}
              style={{
                height: pxToDp(44),
                width: '100%',
                fontSize: pxToDp(16),
                color: '#333333',
                paddingTop: pxToDp(18),
                paddingBottom: pxToDp(4),
              }}
            />
          </View>
          <View style={{ height: pxToDp(1), backgroundColor: '#e5e5e5' }}></View>
          <Text style={{ color: '#737373', marginTop: pxToDp(8) }}>好名字可以让你的朋友更容易记住你。</Text>
        </View>
      </View>
    </View>
  );
}
