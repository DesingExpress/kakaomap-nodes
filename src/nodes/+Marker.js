import { ImPure } from "@design-express/fabrica";
// import { MapComponent } from "./map";

export class marker extends ImPure {
  static path = "Kakao/Map_extra";
  static title = "Marker";
  static description = "카카오 맵 마커 생성 노드";

  constructor() {
    super();
    this.addInput("API", "kakaoAPI");
    this.addInput("Lat", "number");
    this.addInput("Lng", "number");
    this.addOutput("onClick", -1);
  }

  onExecute() {
    const _clickable = this.isOutputConnected(1);
    let marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        this.getInputData(2),
        this.getInputData(3)
      ),
      map: this.getInputData(1),
      clickable: _clickable,
    });
    if (_clickable)
      window.kakao.maps.event.addListener(marker, "click", () => {
        this.triggerSlot(1);
      });
    // marker.setMap();
  }
}
