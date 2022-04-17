import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, TouchableWithoutFeedback, SafeAreaView, FlatList, Image } from 'react-native';
import { bgColordise } from '../../res/colorMap';
import { pxToDp, useFetchHttp } from '../../utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { ACTIVITYLIST_URL, AVATAR_URI } from '../../utils/pathMap';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { storeUserInfo } from '../../store/userInfo.slice';
import { activityDataType } from '../../types/requsetDataType';
import { ActivityTabBar } from './components/activityTabBar';

const statusBarHeight = StatusBar.currentHeight;
const ActivityPage = () => {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const userInfo = useSelector(storeUserInfo).useInfoData;
  const [activityDataList, setActivityDataList] = useState<activityDataType['list'] | undefined>(undefined);
  const client = useFetchHttp();
  const [sendData, setSendData] = useState({ page: 1, size: 10 });
  useEffect(() => {
    getActivityData({ page: 1, size: 10 }).then((data: activityDataType) => {
      if (!activityDataList) {
        setActivityDataList(data.list);
      }
    });
  }, []);

  const getActivityData = (sendData: { page: number; size: number }) =>
    client(ACTIVITYLIST_URL, { reqMethod: 'GET', data: sendData });
  const renderItem = ({ item }: { item: activityDataType['list'][0] }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('ActivityDetailsPage', { detailsInfo: item });
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: pxToDp(10),
            flexDirection: 'row',
            borderRadius: pxToDp(6),
            padding: pxToDp(10),
            alignItems: 'center',
            borderColor: '#eee',
            borderBottomWidth: pxToDp(1.5),
          }}
        >
          <View style={{ height: pxToDp(100), width: pxToDp(100) }}>
            <Image
              source={{ uri: AVATAR_URI + item.stImg }}
              style={{ width: '100%', height: '100%', borderRadius: pxToDp(3) }}
            />
          </View>
          <View style={{ paddingLeft: pxToDp(6), width: pxToDp(250) }}>
            <View
              style={{
                height: pxToDp(23),
                overflow: 'hidden',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: pxToDp(15),
                  fontWeight: '700',
                  color: '#333',
                }}
              >
                {item.stTitle}
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
                {item.stCrowd}
              </Text>
            </View>

            {/* 活动时间 */}
            <View style={{ marginTop: pxToDp(3), marginBottom: pxToDp(3) }}>
              <Text style={{ color: '#666', fontSize: pxToDp(14) }}>
                <Text>{moment(item.stStartTime).format('YYYY-MM-DD')}</Text>
                <Text> —— </Text>
                <Text>{moment(item.stEndTime).format('YYYY-MM-DD')}</Text>
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              {(item.stCrowd == userInfo.fenyuan || item.stCrowd == item.stOrganization || item.stCrowd == '全校') &&
              item.stStatus == 3 ? (
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
              ) : (
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
              )}
              <Text
                style={{
                  fontSize: pxToDp(14),
                  color: '#666',
                  marginLeft: pxToDp(6),
                }}
              >
                可参与{item.stCanNumber}人
              </Text>

              <Text
                style={{
                  color: '#ef4136',
                  paddingLeft: pxToDp(40),
                  fontWeight: '600',
                }}
              >
                {item.stStatus == 5 ? '已结束' : item.stStatus == 4 ? '已开始' : '未开始'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const onEndReachedHandler = () => {
    // page++;
    const changeData = { page: sendData.page + 1, size: 10 };
    getActivityData(changeData).then((data: activityDataType) => {
      if (activityDataList) {
        setActivityDataList([...activityDataList, ...data.list]);
      }
    });
    setSendData(changeData);
    // getActivityData()
    // const result = await this.getActivityData({ page: page, size: 10 });
    // const arr = [...activityDataList, ...result.data.list];
    // this.setState({ activityDataList: arr });
  };
  return (
    <View style={{ backgroundColor: bgColordise, flex: 1 }}>
      <View style={{ backgroundColor: '#2a84ff' }}>
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
          <Text></Text>
          <Text></Text>
          <Text style={{ fontSize: pxToDp(30), color: '#fff' }}>+</Text>
        </View>
      </View>

      <ActivityTabBar userInfo={userInfo} />
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
              keyExtractor={(item) => item.stId.toString()}
              onEndReached={onEndReachedHandler}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default ActivityPage;
