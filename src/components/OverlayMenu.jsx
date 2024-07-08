import { useEffect, useRef } from 'react';

export default function OverlayMenu({ children, onClose }) {
  const popupRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!popupRef) return;
      const { current } = popupRef;
      // 클릭한 요소가 팝업이 아닐때 팝업을 닫는다.
      if (!current || current.contains(e?.target || null)) {
        return;
      }
      onClose(e);
    };
    document.addEventListener('mouseup', handler);
    return () => {
      document.removeEventListener('mouseup', handler);
    };
  }, [onClose]);
  return <div ref={popupRef}>{children}</div>;
}
