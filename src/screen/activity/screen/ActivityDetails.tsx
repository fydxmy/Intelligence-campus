import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import XmyNav from '../../../components/xmyNav';
import { bgColordise } from '../../../res/colorMap';
import { pxToDp } from '../../../utils/stylesKits';
import moment from 'moment';
import StepIndicator from 'react-native-step-indicator';
import { Button } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityListItemType } from '../data';
import { AVATAR_URI } from '../../../config';
import { canActivity, queryActivityGrade } from '../services';

const labels = ['报名', '签到', '签退', '活动结束'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};
type Props = NativeStackScreenProps<any, any> & {
  route: {
    params: {
      detailsInfo: ActivityListItemType;
    };
  };
};
export function ActivityDetails(props: Props) {
  const { detailsInfo } = props.route.params;
  const [activityStatus, setActivityStatus] = useState(0); // 0报名 1已报名 2签到 3签退
  const [hintStr, setHintStr] = useState('等待报名');
  const [activityGrade, setActivityGrade] = useState<any>();
  useEffect(() => {
    isStatusHandler();
    queryActivityGrade({ activityId: detailsInfo.id }).then((res) => {
      setActivityGrade(res.list[0]);
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currentTimeTamp = Number(moment(new Date()).format('X'));
  const startTimeTamp = Number(moment(detailsInfo.startTime).format('X'));
  const endTimeTamp = Number(moment(detailsInfo.endTime).format('X'));
  const isStatusHandler = async () => {
    if (currentTimeTamp > endTimeTamp + 7200) {
      setActivityStatus(4);
      setHintStr('活动已结束');
    }
    if (endTimeTamp - 3600 < currentTimeTamp && currentTimeTamp < endTimeTamp + 7200) {
      setActivityStatus(3);
      setHintStr('签退活动');
    }
    if (startTimeTamp < currentTimeTamp && currentTimeTamp < startTimeTamp + 3600) {
      setActivityStatus(2);
      setHintStr('签到活动');
    }
    if (startTimeTamp - 3600 * 4 < currentTimeTamp && currentTimeTamp < startTimeTamp) {
      setActivityStatus(1);
      setHintStr('参与活动');
    }
    if (currentTimeTamp < startTimeTamp - 3600 * 4) {
      setActivityStatus(-1);
    }
  };
  const updateActivityInfo = () => {
    if (activityStatus === 1) {
      canActivity({
        title: detailsInfo.title,
        grade: detailsInfo.grade,
        state: activityStatus,
        activityId: detailsInfo.id,
      }).then((res) => {
        console.log(res);
      });
    }
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
                  // source={{ uri: AVATAR_URI + detailsInfo.imgUrl }}
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
                  marginBottom: pxToDp(6),
                }}
              >
                活动进度
              </Text>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={activityStatus}
                labels={labels}
                stepCount={4}
              />
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
                活动状态
              </Text>
              <Text style={{ color: '#444', fontSize: pxToDp(16) }}>
                {activityGrade?.state === 0
                  ? '未签到'
                  : activityGrade?.state === 1
                  ? '已签到'
                  : activityGrade?.state === 2
                  ? '已签退'
                  : '未报名'}
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          title={hintStr}
          disabled={['等待报名', '等待签到', '等待签退', '活动已结束'].indexOf(hintStr) === -1 ? false : true}
          buttonStyle={{ height: pxToDp(40), width: pxToDp(300) }}
          onPress={updateActivityInfo}
        />
      </View>
    </View>
  );
}
