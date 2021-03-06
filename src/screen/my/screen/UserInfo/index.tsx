import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import XmyNav from '../../../../components/xmyNav';
import IconFont from '../../../../components/IconFont';
import { bgColordise } from '../../../../res/colorMap';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { pxToDp } from '../../../../utils';
import { AVATAR_URI } from '../../../../config/index';
import { navigationType } from '../../../../types/navigationType';
import { useSelector } from 'react-redux';
import { storeUserInfo } from '../../../../store/userInfo.slice';

const statusBarHeight = StatusBar.currentHeight;
interface UserInfoPropsType extends navigationType {}
export const UserInfo = (props: UserInfoPropsType) => {
  const userInfo = useSelector(storeUserInfo);
  return (
    <View style={{ flex: 1, backgroundColor: bgColordise }}>
      <HeaderImageScrollView
        maxHeight={pxToDp(232)}
        minHeight={statusBarHeight}
        headerImage={require('../../../../../public/imgs/20210406164057568001.jpg')}
        renderForeground={() => (
          <View
            style={{
              height: pxToDp(232),
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          >
            <XmyNav
              StatusBarColor="light-content"
              onPress={() => {
                props.navigation.goBack();
              }}
              leftIconStyle={{ color: '#fff' }}
            />
            <View style={{ marginTop: pxToDp(60), marginLeft: pxToDp(25) }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: AVATAR_URI + userInfo?.avatar }}
                  style={{
                    width: pxToDp(70),
                    height: pxToDp(70),
                    borderRadius: pxToDp(6),
                    borderWidth: pxToDp(3),
                    borderColor: '#fff',
                  }}
                />
                <View style={{ marginLeft: pxToDp(10) }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: pxToDp(21),
                      marginTop: pxToDp(5),
                    }}
                  >
                    {userInfo?.nickName}
                  </Text>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: pxToDp(16),
                      marginTop: pxToDp(5),
                    }}
                  >
                    <Text>??????: </Text>
                    <Text>{userInfo?.studentId}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      >
        <View style={{ backgroundColor: '#ffffff' }}>
          {/* ???????????? */}
          <View style={{ paddingLeft: pxToDp(18), paddingRight: pxToDp(16) }}>
            <View
              style={{
                flexDirection: 'row',
                height: pxToDp(30),
                alignItems: 'center',
                paddingRight: pxToDp(12),
                marginTop: pxToDp(10),
              }}
            >
              <IconFont name="jgvr" style={{ fontSize: pxToDp(20), color: '#00b6ff' }} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                height: pxToDp(30),
                alignItems: 'center',
                paddingRight: pxToDp(12),
                marginTop: pxToDp(10),
              }}
            >
              <IconFont name="jgvr" style={{ fontSize: pxToDp(20) }} />
              <Text style={{ marginLeft: pxToDp(6) }}>{userInfo?.gender == 1 ? '???' : '???'}</Text>
              <Text style={{ marginLeft: pxToDp(4) }}>{userInfo?.age}???</Text>
              <Text
                style={{
                  marginLeft: pxToDp(6),
                  color: '#b0b2bf',
                  fontSize: pxToDp(18),
                  marginRight: pxToDp(5),
                  marginTop: pxToDp(-1),
                }}
              >
                |
              </Text>
              {/* <Text>{userInfo?.campus}</Text> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                height: pxToDp(50),
                alignItems: 'center',
                paddingRight: pxToDp(12),
                marginTop: pxToDp(10),
              }}
            >
              <IconFont name="jgvr" style={{ fontSize: pxToDp(20) }} />
              <Text style={{ marginLeft: pxToDp(6) }}>{userInfo?.selfIntroduction}</Text>
            </View>
          </View>
          <View style={{ paddingLeft: pxToDp(16), marginTop: pxToDp(20) }}>
            <View>
              <Text
                style={{
                  fontSize: pxToDp(24),
                  fontWeight: '600',
                  color: '#333',
                }}
              >
                ????????????
              </Text>
            </View>
          </View>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};
