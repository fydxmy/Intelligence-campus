// import { useCallback, useState, useReducer } from 'react';
// import { useMountedStatus } from './useMountedStatus';

// interface StateType<D> {
//   error: Error | null;
//   data: D | null;
//   stat: 'idle' | 'loading' | 'error' | 'success';
//   ret: number;
// }
// const defaultInitialState: StateType<null> = {
//   stat: 'idle',
//   data: null,
//   error: null,
//   ret: 0,
// };
// const defaultConfig = {
//   throwOnError: false,
// };

// const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
//   const mountedRef = useMountedStatus();
//   return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : 0), [dispatch, mountedRef]);
// };

// export const useAsync = <D>(initialState?: StateType<D>, initialConfig?: typeof defaultConfig) => {
//   const config = { ...defaultConfig, ...initialConfig };
//   const [state, dispatch] = useReducer(
//     (state: StateType<D>, action: Partial<StateType<D>>) => ({
//       ...state,
//       ...action,
//     }),
//     {
//       ...defaultInitialState,
//       ...initialState,
//     }
//   );
//   // 惰性初始化 state
//   const [retry, setRetry] = useState(() => () => {});

//   // 判断组件否是挂载
//   const safeDispatch = useSafeDispatch(dispatch);

//   const setData = useCallback(
//     (data: D) =>
//       safeDispatch({
//         stat: 'success',
//         data,
//         error: null,
//       }),
//     [safeDispatch]
//   );

//   const setError = useCallback(
//     (error: Error) =>
//       safeDispatch({
//         stat: 'error',
//         data: null,
//         error,
//       }),
//     [safeDispatch]
//   );

//   // run 用来触发异步请求
//   const run = useCallback(
//     (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
//       if (!promise || !promise.then) {
//         throw new Error('请输入 Promise类型');
//       }
//       setRetry(() => () => {
//         if (runConfig?.retry) {
//           run(runConfig?.retry(), runConfig);
//         }
//       });
//       safeDispatch({ stat: 'loading' });
//       return promise
//         .then((data) => {
//           setData(data);
//           return data;
//         })
//         .catch((error) => {
//           setError(error);
//           if (config.throwOnError) {
//             return Promise.reject(error);
//           }
//           return error;
//         });
//     },
//     [config.throwOnError, setData, setError, safeDispatch]
//   );
//   return {
//     run,
//     setData,
//     setError,
//     retry, // retry调用时重新执行一遍run
//     ...state,
//   };
// };
