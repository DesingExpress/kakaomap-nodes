import { ImPure } from "@design-express/fabrica";
import { MapComponent } from "./map";

export class kakaoMap extends ImPure {
  static path = "Kakao";
  static title = "Map";
  static description = "카카오 맵 API 지원 노드";

  constructor() {
    super();
    this.addInput("API_key", "string");
    this.addInput("Lat", "number");
    this.addInput("Lng", "number");
    this.addOutput("component", "");
    this.addOutput("onReady", -1);
    this.addOutput("API", "kakaoAPI");
    this.MAP_API_FUNC = (m) => {
      this.triggerSlot(2);
      this.setOutputData(3, m);
    };
  }

  onExecute() {
    this.setOutputData(
      1,
      <MapComponent
        appKey={this.getInputData(1)}
        lat={this.getInputData(2)}
        lng={this.getInputData(3)}
        cb={this.MAP_API_FUNC}
      />
    );
    this.setOutputData(2, this.MAP_API);
  }
}
