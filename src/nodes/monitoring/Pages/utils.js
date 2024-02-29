import { openFile } from "#extension:file";
import { join, normalize } from "path";

export async function loadMarkerImage(imgName) {
  const isDebug = !!window.__DESIGN_EXPRESS__DO_NOT_USE_THIS__;
  let imgPath = join(isDebug ? "assets" : "", normalize(imgName));
  let imgSrc = await openFile(imgPath, null)
    .catch((e) => {
      return undefined;
    })
    .then((v) => {
      const _url = window.URL.createObjectURL(new Blob([v]));
      return _url;
    });

  // let imgSize = new window.kakao.maps.Size(33, 48);
  let isSelected = imgName.includes("true");
  let ratio = 1.2;
  let w = isSelected ? 33 * ratio : 33;
  let h = isSelected ? 48 * ratio : 48;
  let imgSize = new window.kakao.maps.Size(w, h);
  let imgOption = { offset: new window.kakao.maps.Point(w / 2, h) };
  return new window.kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);
}
