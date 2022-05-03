import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import XmyNav from '../../../../../../components/xmyNav';
import { pxToDp } from '../../../../../../utils';
import { AVATAR_URI } from '../../../../../../config/index';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { uploadSingleFile } from '../../../../../../services';
import { updateUserInfo } from '../../services';
import { userInfoSlice } from '../../../../../../store/userInfo.slice';
// import { UPLOADIMGAVATOR_URL } from '../../../../../../utils/pathMap';
// import { userInfoType } from '../../../../../../types/requsetDataType';
// import { ASuserInfoMap, storeData } from '../../../../../../asyncStorage';

interface SetAvatorPropsType extends NativeStackScreenProps<{ UserInfoEdit: { content: string } }, 'UserInfoEdit'> {}
export const SetAvator = (props: SetAvatorPropsType) => {
  const [content, setContent] = useState(props.route.params.content);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const chooeseAvatorImg = async () => {
    setModalVisible(false);
    let image;
    try {
      image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
    } catch (error) {}

    if (image) {
      uploadAvatorImgSendHandler(image);
    }
  };

  const uploadAvatorImgSendHandler = (image: any) => {
    const formData = new FormData();
    formData.append('file', {
      // 本地图片的地址
      uri: image.path,
      // 图片的类型
      type: image.mime,
      // 图片的名称 file:///store/com/pic/dsf/d343.jpg
      name: image.path.split('/').pop(),
    });
    formData.append('fileType', 'userAvatar');
    uploadSingleFile(formData, { 'Content-Type': 'multipart/form-data' }).then((fileRes) => {
      setContent(fileRes.uri);
      updateUserInfo({ avatar: fileRes.uri }).then((res) => {
        dispatch(userInfoSlice.actions.setUserInfo(res.userInfo));
      });
    });
  };

  return (
    <View style={{ backgroundColor: '#000', flex: 1 }}>
      <View style={{}}>
        <XmyNav
          style={{ backgroundColor: '#000' }}
          StatusBarColor="light-content"
          centerContent="头像"
          centerContentStyle={{ color: '#fff' }}
          onPress={() => {
            props.navigation.goBack();
          }}
          leftIconStyle={{ color: '#fff' }}
          leftDOM={
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <Text style={{ color: '#fff' }}>……</Text>
            </TouchableWithoutFeedback>
          }
        />
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          height: pxToDp(375),
          marginTop: pxToDp(100),
        }}
      >
        <Image
          source={{ uri: AVATAR_URI + content }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: pxToDp(6),
            marginRight: pxToDp(8),
          }}
        />
      </View>
      <Modal isVisible={modalVisible} deviceWidth={pxToDp(375)} style={{ margin: 0 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f7f7f7',
            marginTop: pxToDp(630),
            borderRadius: pxToDp(10),
            overflow: 'hidden',
          }}
        >
          <TouchableWithoutFeedback onPress={chooeseAvatorImg}>
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
              <Text style={{ color: '#191919', fontSize: pxToDp(16) }}>从手机相册中选中</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
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
              <Text style={{ color: '#191919', fontSize: pxToDp(16) }}>保存到手机</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <View
              style={{
                height: pxToDp(50),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ color: '#191919', fontSize: pxToDp(16) }}>取消</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};
