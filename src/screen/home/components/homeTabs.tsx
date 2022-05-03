import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import InfoList from './infoList';

const renderScene = SceneMap({
  first: () => <InfoList type={'信息公开'} />,
  second: () => <InfoList type={'江工要闻'} />,
  three: () => <InfoList type={'院(部)动态'} />,
});

export function HomeTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '消息公开' },
    { key: 'second', title: '江工要闻' },
    { key: 'three', title: '院(部)动态' },
  ]);
  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          onTabPress={({ route }) => {
            switch (route.key) {
              case 'first':
                setIndex(0);
                break;
              case 'second':
                setIndex(1);
                break;
              default:
                setIndex(2);
            }
          }}
        />
      )}
    />
  );
}
