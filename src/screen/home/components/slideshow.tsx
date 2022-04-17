import React from 'react';
import { View, Text, Image } from 'react-native';
import XmyIconFont from '../../../components/xmyIconFont';
import { pxToDp } from '../../../utils';
import { Carousel } from 'teaset';

export const Slideshow = () => {
  const carouselList = [
    { id: 1, ImgCource: require('../../../res/imgs/20210406164057568001.jpg') },
    { id: 2, ImgCource: require('../../../res/imgs/20210406164547405001.jpg') },
    { id: 3, ImgCource: require('../../../res/imgs/20210906160401323001.jpg') },
    { id: 4, ImgCource: require('../../../res/imgs/20210402162616760001.jpg') },
  ];

  return (
    <View style={{ height: pxToDp(232) }}>
      <Carousel
        style={{ height: pxToDp(232) }}
        control={
          <Carousel.Control
            style={{
              alignItems: 'flex-end',
              bottom: pxToDp(15),
              right: pxToDp(10),
            }}
            dot={
              <Text
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: '#5bc0de',
                  padding: 4,
                }}
              >
                <XmyIconFont name="weixuanzhong" style={{ fontSize: pxToDp(10) }} />
              </Text>
            }
            activeDot={
              <Text
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: '#5bc0de',
                  padding: 4,
                }}
              >
                <XmyIconFont name="xuanzhong" style={{ fontSize: pxToDp(10) }} />
              </Text>
            }
          />
        }
      >
        {carouselList.map((item) => (
          <Image
            style={{ width: '100%', height: pxToDp(232) }}
            resizeMode="cover"
            key={item.id}
            source={item.ImgCource}
          />
        ))}
      </Carousel>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: pxToDp(16),
          backgroundColor: '#f8f8f8',
          width: '100%',
          borderTopRightRadius: pxToDp(10),
          borderTopLeftRadius: pxToDp(10),
        }}
      ></View>
    </View>
  );
};
