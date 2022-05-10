import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import XmyNav from '../../../components/xmyNav';
import { pxToDp } from '../../../utils/stylesKits';
// import Picker from "react-native-picker";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Button } from 'react-native-elements';
import { AVATAR_URI } from '../../../utils/pathMap';
import ImagePicker from 'react-native-image-crop-picker';
import { APPLYACTIVITY_URL } from '../../../utils/pathMap';
import { fetchHttp } from '../../../utils';

export class ApplyActivityPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      stTitle: '七步诗七步诗曹植七步诗曹植七步诗曹植曹植',
      stIntroduce: '煮豆持作羹漉菽以为汁萁在釜下燃豆在釜中泣本自同根生相煎何太急',
      stSignWay: '定位签到',
      stApplyStartTime: 1634635860000,
      stApplyEndTime: 1634635860000,
      stStartTime: 1634635860000,
      stEndTime: 1634635860000,
      stLocation: '科技园区',
      stCanNumber: '100000',
      stGrade: '0.6',
      isDatePickerVisible: false,
      currentSelectTime: '',
      stImage: {
        path: undefined,
      },
      userInfo: this.props.route.params.userInfo,
    };
  }
  signWaySelectData = ['定位签到', '扫描签到'];
  stCanNmberSelectData = ['100000', '5000', '3000', '100', '50'];

  componentDidMount() {
    console.log(this.props.route.params, 'aa');
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('activityRefresh', {});
  }
  sendSutuoData = async () => {
    let {
      stTitle,
      stIntroduce,
      stSignWay,
      stApplyStartTime,
      stApplyEndTime,
      stStartTime,
      stEndTime,
      stCanNumber,
      stGrade,
      stLocation,
      userInfo,
    } = this.state;
    const { className, name, phoneNumber, fenyuan, role } = userInfo;
    stGrade = Number(stGrade);
    const defaultImgURI = 'images/sutuo/sutuo1.webp';
    const sendData = {
      stTitle,
      stIntroduce,
      stSignWay,
      stApplyStartTime,
      stApplyEndTime,
      stStartTime,
      stEndTime,
      stCanNumber,
      stGrade,
      stLocation,
      className,
      name,
      phoneNumber,
      fenyuan,
      role,
      stImg: defaultImgURI,
    };
    // const res = await fetchHttp(APPLYACTIVITY_URL, {});
    this.props.navigation.goBack();
  };
  selectStSignWayHandler = () => {
    // Picker.init({
    //   pickerData: this.signWaySelectData,
    //   selectedValue: ["定位签到"],
    //   pickerConfirmBtnText: "确定",
    //   pickerCancelBtnText: "取消",
    //   pickerTitleText: "选择签到方式",
    //   onPickerConfirm: (data) => {
    //     this.setState({ stSignWay: data[0] });
    //     console.log(data);
    //   },
    // });
    // Picker.show();
  };
  selectStCanNmberHandler = () => {
    // Picker.init({
    //   pickerData: this.stCanNmberSelectData,
    //   selectedValue: ["100000"],
    //   pickerConfirmBtnText: "确定",
    //   pickerCancelBtnText: "取消",
    //   pickerTitleText: "选择可参与人数",
    //   onPickerConfirm: (data) => {
    //     this.setState({ stCanNumber: data[0] });
    //   },
    // });
    // Picker.show();
  };
  selectDateTimeHander = async (stTimeName: string) => {
    await this.setState({ currentSelectTime: stTimeName });
    this.setState({ isDatePickerVisible: true });
  };
  onDateTimeConfirmHander = (date: any) => {
    const { currentSelectTime } = this.state;
    const timestamp = moment(date).valueOf();
    this.setState({
      isDatePickerVisible: false,
      [currentSelectTime]: timestamp,
    });
  };
  alterSutuoImg = async () => {
    let image;
    try {
      image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
    } catch (error) {}
    this.setState({ stImage: image });
  };
  render() {
    const {
      stTitle,
      stIntroduce,
      stSignWay,
      stApplyStartTime,
      stApplyEndTime,
      stStartTime,
      stEndTime,
      isDatePickerVisible,
      stCanNumber,
      stGrade,
      stImage,
      stLocation,
    } = this.state;
    console.log(stImage.path);
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ backgroundColor: '#2a84ff' }}>
          <XmyNav
            StatusBarColor="light-content"
            leftIconStyle={{ color: '#fff' }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
            centerContent="活动申请"
            centerContentStyle={{ color: '#fff' }}
            rightContentStyle={{ color: '#fff' }}
          />
        </View>
        <SafeAreaView>
          <ScrollView>
            <View
              style={{
                marginRight: pxToDp(12),
                marginLeft: pxToDp(12),
                backgroundColor: '#fff',
                marginTop: pxToDp(20),
                paddingBottom: pxToDp(30),
                borderRadius: pxToDp(10),
                overflow: 'hidden',
                marginBottom: pxToDp(100),
              }}
            >
              <TouchableWithoutFeedback onPress={this.alterSutuoImg}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingLeft: pxToDp(16),
                    paddingRight: pxToDp(16),
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      paddingTop: pxToDp(15),
                      paddingBottom: pxToDp(10),
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: pxToDp(16) }}>活动图片：</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: pxToDp(20),
                      }}
                    >
                      <Image
                        source={{
                          uri: stImage.path === undefined ? AVATAR_URI + 'images/sutuo/sutuo1.webp' : `${stImage.path}`,
                        }}
                        style={{
                          width: pxToDp(120),
                          height: pxToDp(120),
                          borderRadius: pxToDp(5),
                          marginRight: pxToDp(8),
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      height: pxToDp(1),
                      backgroundColor: '#eee',
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>

              <View
                style={{
                  paddingLeft: pxToDp(12),
                  paddingRight: pxToDp(12),
                  marginTop: pxToDp(20),
                }}
              >
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: pxToDp(16) }}> 活动名称：</Text>
                  <View
                    style={{
                      height: pxToDp(90),
                      borderColor: '#eee',
                      borderWidth: pxToDp(1),
                      borderRadius: pxToDp(5),
                      marginTop: pxToDp(6),
                      marginBottom: pxToDp(8),
                      width: '100%',
                    }}
                  >
                    <TextInput
                      value={stTitle}
                      selectionColor="#333333"
                      onChangeText={(stTitle) => {
                        this.setState({ stTitle });
                      }}
                      multiline={true}
                      style={{
                        height: pxToDp(90),
                        fontSize: pxToDp(18),
                        color: '#666',
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        paddingBottom: pxToDp(4),
                        paddingTop: pxToDp(4),
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#e3e3e3',
                    height: pxToDp(1),
                  }}
                />
              </View>

              <View
                style={{
                  paddingLeft: pxToDp(12),
                  paddingRight: pxToDp(12),
                  marginTop: pxToDp(20),
                }}
              >
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: pxToDp(16) }}> 活动介绍：</Text>
                  <View
                    style={{
                      height: pxToDp(200),
                      borderColor: '#eee',
                      borderWidth: pxToDp(1),
                      borderRadius: pxToDp(5),
                      marginTop: pxToDp(6),
                      marginBottom: pxToDp(8),
                      width: '100%',
                    }}
                  >
                    <TextInput
                      value={stIntroduce}
                      selectionColor="#333333"
                      onChangeText={(stIntroduce) => {
                        this.setState({ stIntroduce });
                      }}
                      multiline={true}
                      style={{
                        height: pxToDp(90),
                        fontSize: pxToDp(18),
                        color: '#666',
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        paddingBottom: pxToDp(4),
                        paddingTop: pxToDp(4),
                      }}
                    />
                  </View>
                </View>
                <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
              </View>

              <View
                style={{
                  paddingLeft: pxToDp(16),
                  paddingRight: pxToDp(16),
                  marginTop: pxToDp(20),
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ width: '30%', fontSize: pxToDp(18) }}> 活动分数：</Text>
                  <View style={{ width: '70%', height: pxToDp(40) }}>
                    <TextInput
                      value={stGrade}
                      keyboardType="phone-pad"
                      selectionColor="#333333"
                      onChangeText={(stGrade) => {
                        this.setState({ stGrade });
                      }}
                      style={{
                        height: pxToDp(44),
                        fontSize: pxToDp(18),
                        color: '#666',
                      }}
                    />
                  </View>
                </View>
                <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.selectDateTimeHander('stApplyStartTime');
                }}
              >
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '40%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 开始报名时间：</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>
                        {moment(stApplyStartTime).format('YYYY-MM-DD HH:mm:ss')}
                      </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.selectDateTimeHander('stApplyEndTime');
                }}
              >
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '40%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 结束报名时间：</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>
                        {moment(stApplyEndTime).format('YYYY-MM-DD HH:mm:ss')}
                      </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.selectDateTimeHander('stStartTime');
                }}
              >
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '40%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 活动开始时间：</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>
                        {moment(stStartTime).format('YYYY-MM-DD HH:mm:ss')}
                      </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.selectDateTimeHander('stEndTime');
                }}
              >
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '40%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 活动结束时间：</Text>
                    </View>
                    <View style={{ width: '60%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>
                        {moment(stEndTime).format('YYYY-MM-DD HH:mm:ss')}
                      </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={this.selectStSignWayHandler}>
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '30%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 签到方式：</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>{stSignWay}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={this.selectStSignWayHandler}>
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '30%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 活动地点：</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>{stLocation}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={this.selectStCanNmberHandler}>
                <View
                  style={{
                    paddingLeft: pxToDp(12),
                    paddingRight: pxToDp(12),
                    marginTop: pxToDp(20),
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      height: pxToDp(40),
                    }}
                  >
                    <View style={{ width: '45%' }}>
                      <Text style={{ fontSize: pxToDp(16) }}> 活动可参与人数：</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontSize: pxToDp(18), color: '#666' }}>{stCanNumber}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#e3e3e3', height: pxToDp(1) }}></View>
                </View>
              </TouchableWithoutFeedback>

              <View
                style={{
                  height: pxToDp(50),
                  paddingRight: pxToDp(16),
                  paddingLeft: pxToDp(16),
                  marginTop: pxToDp(50),
                  marginBottom: pxToDp(100),
                }}
              >
                <Button
                  onPress={this.sendSutuoData}
                  title="确定申请"
                  buttonStyle={{ height: pxToDp(50) }}
                  titleStyle={{ fontSize: pxToDp(18) }}
                  disabled={
                    !(
                      stTitle.length != 0 &&
                      stIntroduce.length != 0 &&
                      stSignWay.length != 0 &&
                      stApplyStartTime.length != 0 &&
                      stApplyEndTime.length != 0 &&
                      stStartTime.length != 0 &&
                      stEndTime.length != 0 &&
                      stCanNumber.length != 0 &&
                      stGrade.length != 0
                    )
                  }
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={this.onDateTimeConfirmHander}
          onCancel={() => {
            this.setState({ isDatePickerVisible: false });
          }}
        />
      </View>
    );
  }
}
