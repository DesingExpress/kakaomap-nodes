import { ImPure } from "@design-express/fabrica";
import { join, normalize } from "path";
import { openFile } from "#extension:file";
const markers = [];
export class marker extends ImPure {
  static path = "Kakao/Map_extra";
  static title = "Marker";
  static description = "카카오 맵 마커 생성 노드";

  constructor() {
    super();
    this.addInput("API", "kakaoAPI");
    this.addInput("positions", "object,array");
    this.addInput("clear", -1);

    this.addOutput("onChange", -1);
    this.addOutput("marker", "array");
    this.addOutput("onClick", -1);
    this.addOutput("clicked", "kakao::marker");

    this.properties = { isClusterer: true };

    this.map = undefined;
    // this.markers = [];
    this.isDebug = !!window.__DESIGN_EXPRESS__DO_NOT_USE_THIS__;
    // this.markerImage =

    this.setMarker = async function setMarker(v, img) {
      const { position } = v; // [lat, lng]
      const clickable = true;

      let marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(...position),
        map: this.getInputData(1),
        clickable,
        image: img ?? null,
      });
      marker.userData = v;
      if (clickable)
        window.kakao.maps.event.addListener(marker, "click", (e) => {
          this.setOutputData(4, marker);
          this.triggerSlot(3);
        });
      markers.push(marker);
    };

    this.onChangeMarker = () => {
      this.setOutputData(2, markers);
      this.triggerSlot(1);
    };
  }

  async onExecute() {
    // const _clickable = this.isOutputConnected(1);
    this.map = this.getInputData(1);
    // this.markers = [];
    const _position = this.getInputData(2) ?? [];

    let imgPath = join(
      this.isDebug ? "assets" : "",
      normalize(`./markerImage.png`)
    );
    let imgSrc = await openFile(imgPath, null).then((v) => {
      const _url = window.URL.createObjectURL(new Blob([v]));
      return _url;
    });
    let imgSize = new window.kakao.maps.Size(33, 48);
    let imgOption = { offset: new window.kakao.maps.Point(16.5, 48) };
    const markerImg = new window.kakao.maps.MarkerImage(
      imgSrc,
      imgSize,
      imgOption
    );

    if (Array.isArray(_position)) {
      _position.forEach((v) => this.setMarker(v, markerImg));
    } else if (typeof _position === "object") this.setMarker(_position);

    this.setOutputData(2, markers);
  }

  async onAction(name) {
    switch (name) {
      case "clear":
        const prevMarkers = [...markers];
        markers.splice(0);
        prevMarkers.forEach((v) => v.setMap(null));
        this.onChangeMarker();
        break;
      default:
        await super.onAction();
    }
  }
}
