import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { pxToDp } from '../utils/stylesKits';
import XmyIconFont from './IconFont';

const statusBarHeight = StatusBar.currentHeight;

interface XmyNavProps {
  style?: StyleProp<ViewStyle>;
  StatusBarColor: 'default' | 'light-content' | 'dark-content';
  centerContent?: string;
  leftContent?: string;
  rightContent?: string;
  rightContentStyle?: object;
  leftIconStyle?: object;
  centerContentStyle?: object;
  onPress?: () => void;
  leftDOM?: any;
}
export default function XmyNav(props: XmyNavProps) {
  return (
    <View style={{ marginTop: statusBarHeight, ...props }}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={props.StatusBarColor} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: pxToDp(16),
          paddingLeft: pxToDp(16),
          height: pxToDp(50),
        }}
      >
        <TouchableOpacity onPress={props.onPress}>
          <View
            style={{
              height: pxToDp(30),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <XmyIconFont
              style={{
                color: '#333333',
                fontSize: pxToDp(25),
                ...props.leftIconStyle,
              }}
              name="fanhui"
            />
            <Text
              style={{
                fontSize: pxToDp(20),
                paddingLeft: pxToDp(5),
                ...props.rightContentStyle,
              }}
            >
              {props.rightContent}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: pxToDp(18), ...props.centerContentStyle }}>{props.centerContent}</Text>

        {props.leftDOM || <Text style={{ fontSize: pxToDp(18) }}>{props.leftContent}</Text>}
      </View>
    </View>
  );
}
