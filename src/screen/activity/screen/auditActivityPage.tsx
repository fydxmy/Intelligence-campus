import React from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { bgColordise } from '../../../res/colorMap';
import { pxToDp } from '../../../utils/stylesKits';
import XmyNav from '../../../components/xmyNav';
import { ACTIVITYLIST_URL, AVATAR_URI } from '../../../utils/pathMap';
import moment from 'moment';
import { fetchHttp } from '../../../utils';
import { store } from '../../../store';
interface State {
  userInfo: object;
  auditActivityDataList: any;
}
interface Props {
  navigation: {
    navigate: (str: string, obj: Object) => void;
  };
}
export class AuditActivityPage extends React.Component<any, State> {
  state = {
    userInfo: {},
    auditActivityDataList: [],
    activityDataList: [],
  };
  page = 1;
  // {"stApplyEndTime": 1634635860000, "stApplyStartTime": 1634635860000, "stAuditId": null, "stAuditUnit": null, "stCanNumber": 100000, "stCreateDate": null, "stCrowd": "2018级软件工程3班", "stEndTime": 1634635860000, "stFinishNumber": 0, "stGrade": 0.6, "stId": 126, "stImg": "images/sutuo/sutuo1.webp", "stInitiator": "井川里予", "stInitiatorPhone": "12345678902", "stIntroduce": "煮豆持作羹漉菽以为汁萁在釜下燃豆在釜中泣本自同根生相煎何太急", "stLocation": "科技园区", "stOrganization": "2018级软件工程3班", "stRank": "班级活动", "stSignWay": "定位签到", "stStartTime": 1634635860000, "stStatus": 1, "stTitle": "七步诗曹植", "stalreadyNumber": 0}

  async componentDidMount() {
    // 查询处于申请状态的活动
    const res = await this.getAuditActivityData({
      page: 1,
      size: 10,
      stStatus: 1,
    });
    this.setState({ auditActivityDataList: res.data.list });
  }
  getAuditActivityData = async (sendData: object) => {
    const res = await fetchHttp(ACTIVITYLIST_URL, {
      data: sendData,
      reqMethod: 'GET',
      token: store.getState().authToken.token,
    });
    return res;
  };
  onEndReachedHandler = async () => {
    const { auditActivityDataList } = this.state;
    this.page++;
    const result = await this.getAuditActivityData({
      page: this.page,
      size: 10,
      stStatus: 1,
    });
    const arr = [...auditActivityDataList, ...result.data.list];
    this.setState({ auditActivityDataList: arr });
  };
  renderItem = ({ item }: any) => {
    const { userInfo } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate('AuditDetailsPage', {
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
              <Text
                style={{
                  fontSize: pxToDp(14),
                  color: '#666',
                  marginLeft: pxToDp(6),
                }}
              >
                可参与{item.stCanNumber}人
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    const { userInfo, auditActivityDataList } = this.state;
    return (
      <View style={{ backgroundColor: bgColordise, flex: 1 }}>
        <View style={{ backgroundColor: '#2a84ff' }}>
          <XmyNav
            StatusBarColor="light-content"
            leftIconStyle={{ color: '#fff' }}
            onPress={() => {
              this.props.navigation.goBack();
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
                data={auditActivityDataList}
                renderItem={this.renderItem}
                keyExtractor={(item: any) => item.stId}
                onEndReached={this.onEndReachedHandler}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  }
}
