import { Pure } from "@design-express/fabrica";
// import { MapComponent } from "./map";

export class Clusterer extends Pure {
  static path = "Kakao/Map_extra";
  static title = "Clusterer";
  static description = "카카오 맵 클러스터러 생성 노드";

  constructor() {
    super();
    this.addInput("map", "kakaoAPI");
    this.addInput("markers", "array");
    this.addInput("clear", -1);

    this.addOutput("onChange", -1);
    this.addOutput("clusterer", "kakao::markerclusterer");

    this.properties = { minLevel: 3, minClusterSize: 5 };
    this.clusterer = undefined;
    this.addWidget("number", "minLevel", 3, "minLevel", { min: 1, step: 1 });
    this.addWidget("number", "minClusterSize", 5, "minClusterSize", {
      min: 2,
      step: 1,
    });

    this.onChangeClusterer = () => {
      this.setOutputData(2, this.markers);
      this.triggerSlot(1);
    };
  }

  onExecute() {
    const { minLevel, minClusterSize } = this.properties;
    const map = this.getInputData(1);
    const markers = this.getInputData(2);
    if (!map) return;
    const clusterer = (this.clusterer = new window.kakao.maps.MarkerClusterer({
      map: map,
      markers: markers,
      averageCenter: true,
      minLevel,
      minClusterSize,
    }));

    this.setOutputData(1, clusterer);
  }

  onAction(name) {
    switch (name) {
      case "clear":
        if (!this.clusterer) return;
        this.clusterer.clear();
        this.onChangeClusterer();
        break;
      default:
        this.onExecute();
        this.triggerSlot(0);
        break;
    }
  }
}
