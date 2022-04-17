import { useEffect, useRef } from 'react';

// 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
export const useMountedStatus = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
