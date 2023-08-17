import { useLayoutEffect, useRef } from "react";

export function MapComponent({ appKey, lat, lng, cb }) {
  const _ref = useRef();
  useLayoutEffect(() => {
    let map;
    const _scriptElem = document.createElement("script");
    _scriptElem.type = "text/javascript";
    _scriptElem.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;

    _scriptElem.onload = () => {
      window.kakao.maps.load(() => {
        // console.log(window.kakao.maps.Map);
        map = new window.kakao.maps.Map(_ref.current, {
          center: new window.kakao.maps.LatLng(
            lat ?? 33.450701,
            lng ?? 126.570667
          ), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        });
        cb(map);
      });
    };
    document.head.appendChild(_scriptElem);
    console.log(_scriptElem);
    const _observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === _ref.current) {
          map?.relayout();
        }
      }
    });
    _observer.observe(_ref.current);
    return () => {
      _observer.disconnect();
      _scriptElem.remove();
    };
  }, []);
  return <div style={{ width: "100%", height: "100%" }} ref={_ref} />;
}
