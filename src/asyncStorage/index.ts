import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储数据
export const storeData = async (keyName: string, value: string | object) => {
  return new Promise((resolve, reject) => {
    try {
      if (value.constructor === Object) {
        value = JSON.stringify(value);
      }
      AsyncStorage.setItem(keyName, value as string)
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
    } catch (e) {
      console.log(e, 'storeData存储数据失败');
      reject(e);
    }
  });
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
