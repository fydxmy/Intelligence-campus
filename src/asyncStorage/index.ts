import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储数据
export const storeData = async (keyName: string, value: string | object) => {
  try {
    if (value.constructor === Object) {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(keyName, value as string);
  } catch (e) {
    console.log(e, 'storeData存储数据失败');
  }
};
// 读取
export const getData = async (keyName: string) => {
  try {
    const value = await AsyncStorage.getItem(keyName);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};
export * from './storageMap';
