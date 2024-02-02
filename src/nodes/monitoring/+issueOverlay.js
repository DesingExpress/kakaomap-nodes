import { Pure } from "@design-express/fabrica";
import { UIWrapper } from "./UIComponent";
import { useState } from "react";
import { Issue } from "./UIComponent/issue";
// import { MapComponent } from "./map";

export class IssueOverlay extends Pure {
  static path = "SiteIsuue";
  static title = "IssueOverlay";
  static description = "";
  static #idx = {
    search: 2,
  };

  constructor() {
    super();
    this.addInput("test", "");

    this.addOutput("component", "component");

    this.onSearch = (v) => {
      this.setOutputData(3, v);
      this.triggerSlot(2);
    };

    this.onClickMap = { current: undefined };
    this.onClickMarker = { current: undefined };
  }

  onExecute() {
    this.setOutputData(1, <Issue />);
  }
}