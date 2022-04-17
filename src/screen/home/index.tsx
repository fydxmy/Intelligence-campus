import React from 'react';
import { View } from 'react-native';
import { Slideshow, HomeTabs, FunTabBar } from './components';

export const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <Slideshow />
      <FunTabBar />
      <View style={{ flex: 1 }}>
        <HomeTabs />
      </View>
    </View>
  );
};
