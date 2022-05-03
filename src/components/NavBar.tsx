import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StatusBar, TouchableOpacity, StyleProp, ViewStyle, StyleSheet, StatusBarProps } from 'react-native';
import { pxToDp } from '../utils/stylesKits';
import XmyIconFont from './IconFont';

const statusBarHeight = StatusBar.currentHeight;

interface XmyNavProps {
  navStyle?: StyleProp<ViewStyle>;
  StatusBarColor: 'default' | 'light-content' | 'dark-content';
  LeftNode?: JSX.Element;
  rightNode?: JSX.Element;
  centerNode?: JSX.Element;
  StatusBarProps?: StatusBarProps;
}
export default function NavBar(props: XmyNavProps) {
  const { LeftNode, rightNode, centerNode, StatusBarProps, navStyle } = props;
  const navigation = useNavigation();
  return (
    <View style={[styles['nav-style'], navStyle]}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={props.StatusBarColor ?? 'default'}
        {...StatusBarProps}
      />
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
        {LeftNode ?? (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View>
                <XmyIconFont
                  style={{
                    color: '#333333',
                    fontSize: pxToDp(25),
                  }}
                  name="fanhui"
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.conter}>{centerNode ?? undefined}</View>
        <View style={styles.right}>{rightNode ?? undefined}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  'nav-style': { marginTop: statusBarHeight },
  left: {
    width: pxToDp(50),
  },
  conter: {},
  right: {
    width: pxToDp(50),
  },
});
