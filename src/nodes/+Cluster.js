import { Pure } from "@design-express/fabrica";
// import { MapComponent } from "./map";

const clustererStore = { current: undefined };
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
    // this.clusterer = undefined;
    this.addWidget("number", "minLevel", 3, "minLevel", { min: 1, step: 1 });
    this.addWidget("number", "minClusterSize", 10, "minClusterSize", {
      min: 2,
      step: 1,
    });

    this.onChangeClusterer = () => {
      this.setOutputData(2, this.clusterer);
      this.triggerSlot(1);
    };
    // this.markers = [];
  }

  onExecute() {
    const { minLevel, minClusterSize } = this.properties;
    const map = this.getInputData(1);
    const markers = this.getInputData(2);
    if (!map) return;
    const clusterer = (clustererStore.current =
      new window.kakao.maps.MarkerClusterer({
        map: map,
        markers: markers,
        averageCenter: true,
        minLevel,
        minClusterSize,
      }));
    this.setOutputData(2, clusterer);
  }

  async onAction(name) {
    switch (name) {
      case "clear":
        if (!clustererStore.current) return;
        await clustererStore.current.clear();
        this.onChangeClusterer();
        break;
      default:
        this.onExecute();
        this.triggerSlot(0);
        break;
    }
  }
}
