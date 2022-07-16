import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Image,
  DeviceEventEmitter,
  EmitterSubscription,
} from 'react-native';
import { bgColordise } from '../../../res/colorMap';
import { pxToDp } from '../../../utils/stylesKits';
import XmyNav from '../../../components/xmyNav';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AVATAR_URI } from '../../../config';
import { queryActivity } from '../services';
import { ActivityListItemType } from '../data';
type Props = NativeStackScreenProps<any> & { auditActivityDataList: any };
export function AuditActivity(props: Props) {
  const { navigation } = props;
  const pageNumberValue = useRef(1);
  const [auditDataList, setAuditDataList] = useState<ActivityListItemType[]>([]);
  const onEndReachedHandler = () => {
    queryActivity({ pageNumber: pageNumberValue.current + 1, pageSize: 10, stStatus: 1 }).then((res) => {
      pageNumberValue.current = pageNumberValue.current + 1;
      setAuditDataList([...auditDataList, ...res.list]);
    });
  };
  const subscription = useRef<EmitterSubscription | undefined>();
  useEffect(() => {
    queryActivityHandler();
    subscription.current = DeviceEventEmitter.addListener('refreshAuditActivity', () => {
      queryActivityHandler();
    });
    return () => {
      if (subscription.current) {
        subscription.current.remove();
      }
      DeviceEventEmitter.emit('refreshActivity');
    };
  }, []);
  const queryActivityHandler = () => {
    queryActivity({ pageNumber: 1, pageSize: 10, stStatus: 1 }).then((res) => {
      setAuditDataList(res.list);
    });
  };
  const renderItem = ({ item }: { item: ActivityListItemType }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('AuditDetails', {
            detailsInfo: item,
          });
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
              source={{ uri: AVATAR_URI + item.imgUrl }}
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
              <Text style={{ color: '#666', fontSize: pxToDp(14) }}>
                <Text>{moment(item.startTime).format('YYYY-MM-DD HH:ss')}</Text>
                <Text>~</Text>
                <Text>{moment(item.endTime).format('YYYY-MM-DD HH:ss')}</Text>
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: pxToDp(14),
                  color: '#666',
                  marginLeft: pxToDp(6),
                }}
              >
                可参与{item.canNumber}人
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={{ backgroundColor: bgColordise, flex: 1 }}>
      <View style={{ backgroundColor: '#2a84ff' }}>
        <XmyNav
          StatusBarColor="light-content"
          leftIconStyle={{ color: '#fff' }}
          onPress={() => {
            navigation.goBack();
          }}
          centerContent="活动审核"
          centerContentStyle={{ color: '#fff' }}
          rightContentStyle={{ color: '#fff' }}
        />
      </View>
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
            审核列表
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <FlatList
              data={auditDataList}
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
