import { ImPure } from "@design-express/fabrica";
import { join, normalize } from "path";
import { openFile } from "#extension:file";
import { loadMarkerImage } from "../Monitoring/Pages/utils";
// const markers = [];
export class marker extends ImPure {
  static path = "Kakao/Map_extra";
  static title = "Marker";
  static description = "카카오 맵 마커 생성 노드";

  constructor() {
    super();
    this.addInput("API", "kakaoAPI");
    this.addInput("positions", "object,array");
    this.addInput("image", "");
    this.addInput("hoverImage", "");
    this.addInput("clear", -1);

    this.addOutput("onChange", -1);
    this.addOutput("marker", "array");
    this.addOutput("onClick", -1);
    this.addOutput("clicked", "kakao::marker");

    this.properties = { isClusterer: true };
    this.markers = [];
    this.map = undefined;

    this.isDebug = !!window.__DESIGN_EXPRESS__DO_NOT_USE_THIS__;

    this.setMarker = async function setMarker(v, defaultImg, hoverImg) {
      const { position } = v;
      const clickable = true;

      let marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(...position),
        map: this.getInputData(1),
        clickable,
        image: defaultImg ?? null,
      });
      marker.userData = v;
      if (clickable) {
        window.kakao.maps.event.addListener(marker, "click", (e) => {
          this.setOutputData(4, marker);
          this.triggerSlot(3);
        });
      }
      // if (hoverImg) {
      //   window.kakao.maps.event.addListener(marker, "mouseover", (e) => {
      //     marker.setImage(hoverImg);
      //   });
      //   window.kakao.maps.event.addListener(marker, "mouseout", (e) => {
      //     marker.setImage(defaultImg ?? null);
      //   });
      // }
      this.markers.push(marker);
    };

    this.onChangeMarker = () => {
      this.setOutputData(2, this.markers);
      this.triggerSlot(1);
    };

    this.loadMarkerImage = (binary, size) => {
      if (!binary) return;
      let imgSrc = window.URL.createObjectURL(new Blob([binary]));
      let imgSize = new window.kakao.maps.Size(...size);
      let imgOption = {
        offset: new window.kakao.maps.Point(size[0] / 2, size[1]),
      };
      return new window.kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);
    };
  }

  async onExecute() {
    // this.markers = [];
    this.map = this.getInputData(1);
    const params = this.getInputData(2) ?? [];

    // const defaultImg = await loadMarkerImage("markerImage.png");
    // const selectedImg = await loadMarkerImage("markerImage_true111.png");
    const defaultImg = this.loadMarkerImage(this.getInputData(3), [33, 48]);
    const hoverImg = this.loadMarkerImage(this.getInputData(4), [
      33 * 1.2,
      48 * 1.2,
    ]);

    if (Array.isArray(params)) {
      params.forEach((v) => this.setMarker(v, defaultImg, hoverImg));
    } else if (typeof params === "object") this.setMarker(params);

    this.setOutputData(2, this.markers);
  }

  async onAction(name) {
    switch (name) {
      case "clear":
        const prevMarkers = [...(this.markers ?? [])];
        this.markers = [];
        prevMarkers.forEach((v) => v.setMap(null));
        this.onChangeMarker();
        break;
      default:
        await super.onAction();
    }
  }
}
