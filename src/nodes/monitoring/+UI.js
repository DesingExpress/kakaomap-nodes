import { Pure } from "@design-express/fabrica";
import { UIWrapper } from "./components";
import { onClickMap, onClickMarker, onLoadSiteInfo } from "./components/store";
export class Wrapper extends Pure {
  static path = "SiteIsuue";
  static title = "Wrapper";
  static description = "";
  static #idx = {
    search: 2,
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

    this.addOutput("component", "component");
    this.addOutput("onSearch", -1);
    this.addOutput("condition", "");

    this.onSearch = (v) => {
      this.setOutputData(3, v);
      this.triggerSlot(2);
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
        onSearch={this.onSearch}

        // aaa={aaa}
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
      default:
        super.onAction();
        break;
    }
  }
}
