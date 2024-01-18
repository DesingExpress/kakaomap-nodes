import { ImPure } from "@design-express/fabrica";
// import { MapComponent } from "./map";

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

    // this.toggle = this.addWidget("toggle", "isClusterer", true, "isClusterer", {
    //   on: true,
    //   off: false,
    // });

    this.map = undefined;
    this.markers = [];

    this.setMarker = (v) => {
      const { position } = v; // [lat, lng]
      const clickable = true;
      let marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(...position),
        map: this.getInputData(1),
        clickable,
      });
      if (clickable)
        window.kakao.maps.event.addListener(marker, "click", (e) => {
          this.setOutputData(3, marker);
          this.triggerSlot(2);
        });
      this.markers.push(marker);
    };

    this.onChangeMarker = () => {
      this.setOutputData(2, this.markers);
      this.triggerSlot(1);
    };
  }

  onExecute() {
    // const _clickable = this.isOutputConnected(1);
    this.map = this.getInputData(1);
    this.markers = [];
    const _position = this.getInputData(2) ?? [];

    if (Array.isArray(_position)) {
      _position.forEach((v) => this.setMarker(v));
    } else if (typeof _position === "object") this.setMarker(_position);

    this.setOutputData(2, this.markers);
  }

  onAction(name) {
    switch (name) {
      case "clear":
        const prevMarkers = [...this.markers];
        prevMarkers.forEach((v) => v.setMap(null));
        this.onChangeMarker();
        break;
      default:
        this.onExecute();
        this.triggerSlot(0);
        break;
    }
  }
}
