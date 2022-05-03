import React from 'react';
import ToastOld, { BaseToast } from 'react-native-toast-message';
import { pxToDp } from '../utils';
import IconFont from './IconFont';
import IconName from '../utils/iconMap';
import { View, StyleSheet } from 'react-native';
const BaseToastRender = (
  props: { message?: string; description?: string },
  option: { borderColor: string; backgroundColor: string }
) => {
  const { message, description } = props;
  const { borderColor, backgroundColor } = option;
  return (
    <BaseToast
      style={{ borderLeftColor: borderColor, borderWidth: pxToDp(1), borderStyle: 'solid', borderColor }}
      contentContainerStyle={{ paddingHorizontal: 15, backgroundColor }}
      text1={message}
      text1Props={{ style: { color: '#000000d9' } }}
      text2Props={{ style: { color: '#000000d9', fontSize: pxToDp(12) } }}
      text2={description}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
      renderLeadingIcon={() => (
        <View style={[styles['icon-container'], { backgroundColor }]}>
          <IconFont name={IconName.fuwuzhongxin} style={styles.icon} />
        </View>
      )}
    />
  );
};
export const toastConfig = {
  success: function ({ props }: { props: { message?: string; description: string } }) {
    return BaseToastRender(props, { borderColor: '#b7eb8f', backgroundColor: '#f6ffed' });
  },
  error: function ({ props }: { props: { message?: string; description?: string } }) {
    return BaseToastRender(props, { borderColor: '#ffccc7', backgroundColor: '#fff2f0' });
  },
  warning: function ({ props }: { props: { message?: string; description?: string } }) {
    return BaseToastRender(props, { borderColor: '#ffe58f', backgroundColor: '#fffbe6' });
  },
  info: function ({ props }: { props: { message?: string; description?: string } }) {
    return BaseToastRender(props, { borderColor: '#91d5ff', backgroundColor: '#e6f7ff' });
  },
};
const styles = StyleSheet.create({
  'icon-container': {
    paddingLeft: pxToDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: pxToDp(24),
  },
});

const Toast = {
  success: function (message = '请求成功', description?: string) {
    ToastOld.show({
      type: 'success',
      props: { message, description },
    });
  },
  error: function (message = '请求失败', description?: string) {
    ToastOld.show({
      type: 'error',
      props: { message, description },
    });
  },
  warning: function (message = '请求成功', description?: string) {
    ToastOld.show({
      type: 'warning',
      props: { message, description },
    });
  },
  info: function (message = '请求成功', description?: string) {
    ToastOld.show({
      type: 'info',
      props: { message, description },
    });
  },
};
export default Toast;
