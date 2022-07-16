import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Image,
  DeviceEventEmitter,
  EmitterSubscription,
} from 'react-native';
import { bgColordise } from '../../res/colorMap';
import { pxToDp } from '../../utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { AVATAR_URI } from '../../config';
import moment from 'moment';
import { ActivityTabBar } from './components/ActivityTabBar';
import { queryActivity } from './services';
import { ActivityListItemType } from './data';

type NewActivityListItemType = ActivityListItemType & {
  canState: number;
};
const statusBarHeight = StatusBar.currentHeight;
export default function ActivityPage() {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const [activityDataList, setActivityDataList] = useState<NewActivityListItemType[]>([]);
  const pageNumberValue = useRef(1);
  const subscription = useRef<EmitterSubscription | undefined>();
  useEffect(() => {
    queryActivityHandler();
    subscription.current = DeviceEventEmitter.addListener('refreshActivity', () => {
      queryActivityHandler();
    });
    return () => {
      if (subscription.current) {
        subscription.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const queryActivityHandler = () => {
    queryActivity({ pageNumber: 1, pageSize: 10, stStatus: 2 }).then((res) => {
      setActivityDataList(currentStateTran(res.list));
    });
  };
  const onEndReachedHandler = () => {
    queryActivity({ pageNumber: pageNumberValue.current + 1, pageSize: 10, stStatus: 2 }).then((res) => {
      pageNumberValue.current = pageNumberValue.current + 1;
      setActivityDataList(currentStateTran([...activityDataList, ...res.list]));
    });
  };

  const currentStateTran = (data: ActivityListItemType[]) => {
    const currentTimeTamp = Number(moment(new Date()).format('X'));
    return data.map((item) => {
      const startTimeTamp = Number(moment(item.startTime).format('X'));
      const endTimeTamp = Number(moment(item.endTime).format('X'));
      let canState = 0; // 0 不可参与、 1可以报名、2可签到、3、可签退
      // 3600000
      if (endTimeTamp - 3600 < currentTimeTamp && currentTimeTamp < endTimeTamp + 7200) {
        canState = 3;
      }
      if (startTimeTamp < currentTimeTamp && currentTimeTamp < startTimeTamp + 3600) {
        canState = 2;
      }
      if (startTimeTamp - 3600 * 4 < currentTimeTamp && currentTimeTamp < startTimeTamp) {
        canState = 1;
      }

      console.log(canState, startTimeTamp - 3600 * 4, currentTimeTamp, startTimeTamp, endTimeTamp);
      return { ...item, canState };
    });
  };
  const renderItem = ({ item }: { item: NewActivityListItemType }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('ActivityDetails', { detailsInfo: item });
        }}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            marginBottom: pxToDp(10),
            paddingLeft: pxToDp(12),
            paddingRight: pxToDp(12),
            paddingTop: pxToDp(10),
            paddingBottom: pxToDp(10),
            borderRadius: pxToDp(6),
            borderBottomWidth: pxToDp(1),
            borderColor: '#eee',
            flexDirection: 'row',
            alignItems: 'flex-start',
            height: pxToDp(110),
          }}
        >
          <View style={{ height: pxToDp(90), width: pxToDp(90) }}>
            <Image
              source={{ uri: AVATAR_URI + item.imgUrl }}
              style={{ width: '100%', height: '100%', borderRadius: pxToDp(3) }}
            />
          </View>
          <View
            style={{
              paddingLeft: pxToDp(6),
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                height: pxToDp(20),
                width: '100%',
                alignContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: pxToDp(16),
                  fontWeight: '700',
                  color: '#333',
                }}
              >
                {item.title}
              </Text>
            </View>
            <View
              style={{
                height: pxToDp(20),
                overflow: 'hidden',
                marginTop: pxToDp(6),
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: pxToDp(15),
                  color: '#222',
                }}
              >
                {item.signWay}
              </Text>
            </View>

            {/* 活动时间 */}
            <View style={{ marginTop: pxToDp(3), marginBottom: pxToDp(3) }}>
              <Text style={{ color: '#666', fontSize: pxToDp(13) }}>
                <Text>{moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text> ~ </Text>
                <Text>{moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {(function () {
                let Element: JSX.Element = <></>;
                switch (item.canState) {
                  case 0:
                    Element = (
                      <Text
                        style={{
                          color: '#d71345',
                          borderWidth: pxToDp(1),
                          borderRadius: pxToDp(3),
                          borderColor: '#d71345',
                          paddingLeft: pxToDp(2),
                          fontSize: pxToDp(12),
                          textAlignVertical: 'center',
                        }}
                      >
                        不可报名
                      </Text>
                    );
                    break;
                  case 1:
                    Element = (
                      <Text
                        style={{
                          color: '#f58220',
                          borderWidth: pxToDp(1),
                          borderRadius: pxToDp(3),
                          borderColor: '#f58220',
                          paddingLeft: pxToDp(2),
                          textAlignVertical: 'center',
                          fontSize: pxToDp(12),
                        }}
                      >
                        可报名
                      </Text>
                    );
                    break;
                  case 2:
                    Element = (
                      <Text
                        style={{
                          color: '#f58220',
                          borderWidth: pxToDp(1),
                          borderRadius: pxToDp(3),
                          borderColor: '#f58220',
                          paddingLeft: pxToDp(2),
                          textAlignVertical: 'center',
                          fontSize: pxToDp(12),
                        }}
                      >
                        可签到
                      </Text>
                    );
                    break;
                  case 3:
                    Element = (
                      <Text
                        style={{
                          color: '#f58220',
                          borderWidth: pxToDp(1),
                          borderRadius: pxToDp(3),
                          borderColor: '#f58220',
                          paddingLeft: pxToDp(2),
                          textAlignVertical: 'center',
                          fontSize: pxToDp(12),
                        }}
                      >
                        可签退
                      </Text>
                    );
                    break;
                }
                return Element;
              })()}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ backgroundColor: bgColordise, flex: 1 }}>
      <View style={{ backgroundColor: '#ffffff' }}>
        <View
          style={{
            marginTop: statusBarHeight,
            height: pxToDp(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: pxToDp(16),
            paddingRight: pxToDp(16),
          }}
        >
          <Text style={{ fontSize: pxToDp(20) }}>素质拓展活动</Text>
          {/* <Text style={{ fontSize: pxToDp(30), color: '#fff' }}>+</Text> */}
        </View>
      </View>

      <ActivityTabBar />
      <View style={{ flex: 1, marginTop: pxToDp(10) }}>
        <View
          style={{
            height: pxToDp(50),
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#fff',
          }}
        >
          <Text
            style={{
              fontSize: pxToDp(20),
              color: '#333',
              marginLeft: pxToDp(16),
              fontWeight: '600',
            }}
          >
            活动Activity
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <FlatList
              data={activityDataList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={onEndReachedHandler}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}
