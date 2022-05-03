import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, SafeAreaView } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { queryCampusNews } from '../services';
import { CampusNewsItemType } from '../data';
type infoDataItemType = {
  dateTime: string;
  infoId: number;
  title: string;
  url: string;
};

type navigationType = NativeStackScreenProps<{ XmyWebView: { url: string } }, 'XmyWebView'>['navigation'];

interface InfoListProps {
  type: string;
}
export default function InfoList(props: InfoListProps) {
  const navigation: navigationType = useNavigation();
  const [dataList, setDataList] = useState<CampusNewsItemType[]>([]);
  const pageNumber = useRef(1);
  useEffect(() => {
    queryCampusNews(props).then((res) => {
      setDataList(res.list);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHttpListData = (data: { pageSize: number; pageNumber: number }) => {
    // return client(props.url, { reqMethod: 'GET', data });
    return queryCampusNews({ ...props, ...data });
  };

  const onEndReachedHandler = async () => {
    pageNumber.current += 1;
    const result = await getHttpListData({ pageNumber: pageNumber.current, pageSize: 10 });
    const res = [...dataList, ...result.list];
    setDataList([...dataList, ...result.list]);
    console.log(res.map((item) => item.id));
  };

  const renderItem = (item: CampusNewsItemType) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('XmyWebView', {
            url: 'http://wap.jxue.edu.cn/' + item.url,
          });
        }}
        key={item.id}
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
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => onEndReachedHandler()}
        />
      </SafeAreaView>
    </View>
  );
}
