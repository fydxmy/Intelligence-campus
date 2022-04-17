import React from 'react';
import { Text } from 'react-native';
import IconMap from '../res/fonts/iconMap';

interface XmyIconFontProps {
  style?: object;
  onPress?: () => void;
  name: string;
}
export default function XmyIconFont(props: XmyIconFontProps) {
  return (
    <Text
      onPress={props.onPress}
      style={{ fontFamily: 'iconfont', ...props.style }}
    >
      {IconMap[props.name]}
    </Text>
  );
}
