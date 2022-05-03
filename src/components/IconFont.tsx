import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import iconMap from '../utils/iconMap';

interface XmyIconFontProps {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  name: string;
}
export default function IconFont(props: XmyIconFontProps) {
  const { style = {}, onPress, name } = props;
  return (
    <Text onPress={onPress} style={[styles.text, style]}>
      {iconMap[name]}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'iconfont',
    color: '#008dff',
  },
});
