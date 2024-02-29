import { Pure } from "@design-express/fabrica";
import { UIWrapper } from "./Pages";
import {
  onClickMap,
  onClickMarker,
  onLoadSiteInfo,
  onAddMarkers,
} from "./Pages/store";
export class Wrapper extends Pure {
  static path = "SiteIsuue";
  static title = "Wrapper";
  static description = "";
  static #idx = {
    SEARCH: 2,
    DOWNLOAD: 4,
    LOG: 6,
    PHOTO: 8,
  };
  static num = 1;

  constructor() {
    super();
    this.addInput("kakaomap", "component");
    this.addInput("onLoad", -1);
    this.addInput("info", "object");
    this.addInput("onClickedMap", -1);
    this.addInput("onClickedMarker", -1);
    this.addInput("clicked", "");
    this.addInput("onAddMarkers", -1);
    this.addInput("markers", "array");

    this.addOutput("component", "component");
    this.addOutput("onSearch", -1);
    this.addOutput("condition", "");
    this.addOutput("onDownload", -1);
    this.addOutput("cid", "");
    this.addOutput("onLog", -1);
    this.addOutput("log", "");
    this.addOutput("onPhoto", -1);
    this.addOutput("photo", "");

    this.onSubmit = (tag, v) => {
      let slotIdx = Wrapper.#idx[tag];
      this.setOutputData(slotIdx + 1, v);
      this.triggerSlot(slotIdx);
    };

    this.onSearch = (v) => {
      this.setOutputData(3, v);
      this.triggerSlot(2);
    };
    this.onDownload = (v) => {
      this.setOutputData(5, v);
      this.triggerSlot(4);
    };
    this.onLog = (v) => {
      this.setOutputData(7, v);
      this.triggerSlot(6);
    };
  }

  onExecute() {
    Wrapper.num++;
    const kakaomap = this.getInputData(1);
    const info = this.getInputData(3) ?? {};
    this.setOutputData(
      1,
      <UIWrapper
        force={Wrapper.num}
        kakaomap={kakaomap}
        info={info}
        onSubmit={this.onSubmit}
        // onSearch={this.onSearch}
        // onDownload={this.onDownload}
        // onLog={this.onLog}
      />
    );
  }

  onAction(evt) {
    switch (evt) {
      case "onClickedMap":
        onClickMap?.current();
        break;
      case "onClickedMarker":
        onClickMarker?.current(this.getInputData(6));
        break;
      case "onLoad":
        onLoadSiteInfo?.current(this.getInputData(3));
        break;
      case "onAddMarkers":
        onAddMarkers?.current(this.getInputData(8));
        break;
      default:
        super.onAction();
        break;
    }
  }
}
