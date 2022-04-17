import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useFetchHttp } from '../../../utils';
type infoDataItemType = {
  dateTime: string;
  infoId: number;
  title: string;
  url: string;
};

type getInfoDataType = {
  list: infoDataItemType[];
  total: number;
};

type navigationType = NativeStackScreenProps<{ XmyWebView: { url: string } }, 'XmyWebView'>['navigation'];

interface InfoListProps {
  url: string;
}
export default function InfoList(props: InfoListProps) {
  const navigation: navigationType = useNavigation();
  const client = useFetchHttp();
  const [dataList, setDataList] = useState<infoDataItemType[]>([]);
  const page = useRef(1);
  useEffect(() => {
    getHttpListData({ page: 1, size: 10 }).then((data) => setDataList(data.list));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHttpListData = (data: { page: number; size: number }) => {
    return client(props.url, { reqMethod: 'GET', data });
  };

  const onEndReachedHandler = async () => {
    page.current += 1;
    const sendData = { page: page.current, size: 10 };
    const result: getInfoDataType = await getHttpListData(sendData);
    setDataList([...dataList, ...result.list]);
  };

  const renderItem = (item: infoDataItemType) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('XmyWebView', {
            url: 'http://wap.jxue.edu.cn/' + item.url,
          });
        }}
        key={item.infoId}
      >
        <View
          style={{
            height: pxToDp(70),
            paddingRight: pxToDp(16),
            paddingLeft: pxToDp(16),
            paddingTop: pxToDp(6),
            paddingBottom: pxToDp(8),
            borderBottomWidth: pxToDp(1),
            borderColor: '#eeeeee',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            marginBottom: pxToDp(10),
          }}
        >
          <View>
            <Text style={{ fontSize: pxToDp(15), fontWeight: 'bold' }}>{item.title}</Text>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingRight: pxToDp(20) }}>
            <Text style={{ color: '#444444' }}>{item.dateTime}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList
          data={dataList}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.infoId.toString()}
          onEndReached={() => onEndReachedHandler()}
        />
      </SafeAreaView>
    </View>
  );
}
