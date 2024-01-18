import { Pure } from "@design-express/fabrica";
import { UIWrapper } from "./UIComponent";
// import { MapComponent } from "./map";

export class Wrapper extends Pure {
  static path = "SiteIsuue";
  static title = "Wrapper";
  static description = "";
  static #idx = {
    search: 2,
  };

  constructor() {
    super();
    this.addInput("kakaomap", "component");
    this.addInput("info", "object");

    this.addOutput("component", "component");
    this.addOutput("onSearch", -1);
    this.addOutput("condition", "");

    this.handleSearch = (v) => {
      this.setOutputData(3, v);
      this.triggerSlot(2);
    };
  }

  onExecute() {
    const kakaomap = this.getInputData(1);
    const info = this.getInputData(2);
    this.setOutputData(
      1,
      <UIWrapper
        kakaomap={kakaomap}
        info={info}
        handleSearch={this.handleSearch}
        // aaa={aaa}
      />
    );
  }
}
