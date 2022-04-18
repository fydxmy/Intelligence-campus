import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';

interface XmyIconFontProps {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  name: string;
}
export default function IconFont(props: XmyIconFontProps) {
  const { style = {}, onPress, name } = props;
  return (
    <Text onPress={onPress} style={[styles.text, style]}>
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'iconfont',
    color: '#008dff',
  },
});
