import { Text, View, Dimensions, Platform, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import XmyNav from '../../../components/xmyNav';
import { bgColordise } from '../../../res/colorMap';
import { AVATAR_URI } from '../../../utils/pathMap';
import { pxToDp } from '../../../utils/stylesKits';
import moment from 'moment';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export function AuditDetailsPage(props: any) {
  const detailsInfo = props.route.params.detailsInfo;
  const [modalVisible, setModalVisible] = useState(false);
  console.log(deviceHeight);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: bgColordise }}>
        <View style={{ backgroundColor: '#2a84ff' }}>
          <XmyNav
            StatusBarColor="light-content"
            leftIconStyle={{ color: '#fff' }}
            onPress={() => {
              props.navigation.goBack();
            }}
            centerContent="审核活动详情"
            centerContentStyle={{ color: '#fff' }}
            rightContentStyle={{ color: '#fff' }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <ScrollView>
              <View
                style={{
                  marginLeft: pxToDp(12),
                  marginRight: pxToDp(12),
                  marginTop: pxToDp(10),
                  backgroundColor: '#fff',
                  borderRadius: pxToDp(5),
                  padding: pxToDp(10),
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{ uri: AVATAR_URI + detailsInfo.stImg }}
                    style={{
                      height: pxToDp(80),
                      width: pxToDp(80),
                      borderRadius: pxToDp(5),
                    }}
                  />
                  <View style={{ width: '77%', paddingLeft: pxToDp(6) }}>
                    <Text style={{ fontSize: pxToDp(17), fontWeight: '600' }}>{detailsInfo.stTitle}</Text>
                    <View style={{ flexDirection: 'row', marginTop: pxToDp(6) }}>
                      <Text
                        style={{
                          backgroundColor: '#f8f8f8',
                          color: '#f1573d',
                          textAlignVertical: 'center',
                          paddingLeft: pxToDp(6),
                          paddingRight: pxToDp(6),
                        }}
                      >
                        参与活动得 {detailsInfo.stGrade} 分
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginLeft: pxToDp(12),
                  marginRight: pxToDp(12),
                  marginTop: pxToDp(10),
                  backgroundColor: '#fff',
                  borderRadius: pxToDp(5),
                  padding: pxToDp(10),
                }}
              >
                <Text
                  style={{
                    fontSize: pxToDp(18),
                    fontWeight: '600',
                    color: '#333',
                  }}
                >
                  活动信息
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                    }}
                  >
                    报名时间：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>
                    {moment(detailsInfo.stApplyStartTime).format('YYYY-MM-DD HH:ss')}~
                    {moment(detailsInfo.stApplyEndTime).format('YYYY-MM-DD HH:ss')}
                  </Text>
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                    }}
                  >
                    活动时间：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>
                    {moment(detailsInfo.stStartTime).format('YYYY-MM-DD HH:ss')}~
                    {moment(detailsInfo.stEndTime).format('YYYY-MM-DD HH:ss')}
                  </Text>
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                      textAlignVertical: 'center',
                    }}
                  >
                    活动地点：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.stLocation}</Text>
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                      textAlignVertical: 'center',
                    }}
                  >
                    签到方式：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.stSignWay}</Text>
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                      textAlignVertical: 'center',
                    }}
                  >
                    活动参与对象：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.stCrowd}</Text>
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                      textAlignVertical: 'center',
                    }}
                  >
                    发起组织：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.stOrganization}</Text>
                </Text>
                <Text style={{ marginTop: pxToDp(6) }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: pxToDp(15),
                      fontWeight: '600',
                      textAlignVertical: 'center',
                    }}
                  >
                    联系方式：
                  </Text>
                  <Text style={{ color: '#666', fontSize: pxToDp(15) }}>
                    {detailsInfo.stInitiator} {detailsInfo.stInitiatorPhone}
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  marginLeft: pxToDp(12),
                  marginRight: pxToDp(12),
                  marginTop: pxToDp(10),
                  backgroundColor: '#fff',
                  borderRadius: pxToDp(5),
                  padding: pxToDp(10),
                }}
              >
                <Text
                  style={{
                    fontSize: pxToDp(18),
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: pxToDp(6),
                  }}
                >
                  活动介绍
                </Text>
                <Text style={{ color: '#444', fontSize: pxToDp(16) }}>{detailsInfo.stIntroduce}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        <View
          style={{
            height: pxToDp(70),
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: pxToDp(20),
            paddingLeft: pxToDp(20),
          }}
        >
          <Button
            title={'审核拒绝'}
            buttonStyle={{ height: pxToDp(40), width: pxToDp(150) }}
            onPress={() => {
              setModalVisible(true);
            }}
          />
          <Button title={'审核通过'} buttonStyle={{ height: pxToDp(40), width: pxToDp(150) }} />
        </View>
      </View>
      <Modal isVisible={modalVisible} deviceWidth={deviceWidth} deviceHeight={deviceHeight} style={{}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#f7f7f7',
            marginTop: pxToDp(630),
          }}
        >
          <Text>q </Text>
        </View>
      </Modal>
    </View>
  );
}
