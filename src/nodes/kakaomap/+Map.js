import { ImPure } from "@design-express/fabrica";
import { MapComponent } from "./components/map";

export class kakaoMap extends ImPure {
  static path = "Kakao";
  static title = "Map";
  static description = "카카오 맵 API 지원 노드";
  static num = 0;

  constructor() {
    super();
    this.addInput("API_key", "string");
    this.addInput("Lat", "number");
    this.addInput("Lng", "number");
    this.addInput("onPanTo", -1);
    this.addInput("position", "");

    this.addOutput("component", "");
    this.addOutput("onReady", -1);
    this.addOutput("API", "kakaoAPI");
    this.addOutput("onClick", -1);
    this.addOutput("clicked", "");

    this.map = undefined;
    this.MAP_API_FUNC = (m) => {
      this.map = m;
      this.setOutputData(3, m);
      this.triggerSlot(2);
    };
    this.onClickMap = (v) => {
      this.setOutputData(5, v);
      this.triggerSlot(4);
    };

    this.panTo = (v) => {
      // const position = new window.kakao.maps.LatLng(v.lat, v.lng);
      const position = new window.kakao.maps.LatLng(...v);
      this.map.panTo(position);
    };
  }

  onExecute() {
    kakaoMap.num++;
    this.setOutputData(
      1,
      <MapComponent
        force={kakaoMap.num}
        appKey={this.getInputData(1)}
        lat={this.getInputData(2)}
        lng={this.getInputData(3)}
        cb={this.MAP_API_FUNC}
        onClick={this.onClickMap}
        onPanTo={this.onPanTo}
      />
    );
    // this.setOutputData(2, this.MAP_API);
  }

  onAction(evt) {
    switch (evt) {
      case "onPanTo":
        const _position = this.getInputData(5);
        this.panTo(_position);
        break;
      default:
        super.onAction();
        break;
    }
  }
}
