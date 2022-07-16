import { Text, View, SafeAreaView, ScrollView, Image, DeviceEventEmitter } from 'react-native';
import React from 'react';
import XmyNav from '../../../components/xmyNav';
import { bgColordise } from '../../../res/colorMap';
import { pxToDp } from '../../../utils/stylesKits';
import moment from 'moment';
import { Button } from 'react-native-elements';
// import Modal from 'react-native-modal';
import { AVATAR_URI } from '../../../config';
import { auditActivity } from '../services';
import { useSelector } from 'react-redux';
import { storeStudentStatus } from '../../../store/studentStatus.slice';
import Toast from '../../../components/ToastConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityListItemType } from '../data';
type Props = NativeStackScreenProps<any> & {
  route: {
    params: {
      detailsInfo: ActivityListItemType;
    };
  };
};
export function AuditDetails(props: Props) {
  const navigation = props.navigation;
  const detailsInfo = props.route.params.detailsInfo;
  // const [modalVisible, setModalVisible] = useState(false);
  const studentStatus = useSelector(storeStudentStatus);
  const startTimeTamp = Number(moment(detailsInfo.startTime).format('X'));
  const auditHander = (stStatus: number) => {
    auditActivity({
      auditId: studentStatus.id || 0,
      auditName: studentStatus.name || '',
      stStatus,
      id: detailsInfo.id,
    }).then((res) => {
      console.log(JSON.stringify(res));
      Toast.success('拒绝成功');
      navigation.goBack();
      DeviceEventEmitter.emit('refreshAuditActivity');
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: bgColordise }}>
      <View style={{ backgroundColor: '#2a84ff' }}>
        <XmyNav
          StatusBarColor="light-content"
          leftIconStyle={{ color: '#fff' }}
          onPress={() => {
            props.navigation.goBack();
          }}
          centerContent="活动详情"
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
                  source={{ uri: AVATAR_URI + detailsInfo.imgUrl }}
                  style={{
                    height: pxToDp(80),
                    width: pxToDp(80),
                    borderRadius: pxToDp(5),
                  }}
                />
                <View style={{ width: '77%', paddingLeft: pxToDp(6) }}>
                  <Text style={{ fontSize: pxToDp(17), fontWeight: '600' }}>{detailsInfo.title}</Text>
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
                      参与活动得 {detailsInfo.grade} 分
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: pxToDp(6) }}>
                <Text style={{ color: '#666', fontSize: pxToDp(15) }}>
                  可与人数：{detailsInfo.canNumber || 0} 已参与：
                  {detailsInfo.stalreadyNumber || 0} 已完成：
                  {detailsInfo.inishNumber || 0}
                </Text>
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
                  {moment.unix(startTimeTamp - 3600 * 4).format('YYYY-MM-DD HH:ss')}~
                  {moment(detailsInfo.startTime).format('YYYY-MM-DD HH:ss')}
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
                  {moment(detailsInfo.startTime).format('YYYY-MM-DD HH:ss')}~
                  {moment(detailsInfo.endTime).format('YYYY-MM-DD HH:ss')}
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
                <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.location}</Text>
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
                <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.signWay}</Text>
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
                <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.rankName}</Text>
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
                <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.organization}</Text>
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
                <Text style={{ color: '#666', fontSize: pxToDp(15) }}>{detailsInfo.auditName}</Text>
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
              <Text style={{ color: '#444', fontSize: pxToDp(16) }}>{detailsInfo.introduce}</Text>
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
            auditHander(-1);
          }}
        />
        <Button
          title={'审核通过'}
          buttonStyle={{ height: pxToDp(40), width: pxToDp(150) }}
          onPress={() => {
            auditHander(2);
          }}
        />
      </View>
      {/* <Modal
        style={{ height: pxToDp(200), width: pxToDp(260), marginLeft: pxToDp((375 - 260) / 2) }}
        isVisible={modalVisible}
        backdropOpacity={0.2}
        onTouchCancel={() => {}}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: pxToDp(200),
              width: '100%',
              height: pxToDp(200),
              padding: pxToDp(20),
            }}
          >
            <View style={{ height: pxToDp(100) }}>
              <Text
                style={{
                  fontSize: pxToDp(16),
                }}
              >
                确认该操作吗？
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button title="取消" onPress={() => setModalVisible(false)} style={{ width: pxToDp() }} />
              <Button title="确定" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}
