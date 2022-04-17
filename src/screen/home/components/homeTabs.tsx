import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import InfoList from './infoList';
import { OPENINFO_URL, IMPORTANCENEW_URL, COLLEGENEW_URL } from '../../../utils/pathMap';

const renderScene = SceneMap({
  first: () => <InfoList url={OPENINFO_URL} />,
  second: () => <InfoList url={IMPORTANCENEW_URL} />,
  three: () => <InfoList url={COLLEGENEW_URL} />,
});

export function HomeTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '消息公开' },
    { key: 'second', title: '江工要闻' },
    { key: 'three', title: '院部动态' },
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
