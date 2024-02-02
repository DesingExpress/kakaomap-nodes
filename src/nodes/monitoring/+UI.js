import { Pure } from "@design-express/fabrica";
import { UIWrapper } from "./UIComponent";
import { useEffect, useReducer, useState } from "react";
import { onClickMap, onClickMarker } from "./UIComponent/store";
// import { MapComponent } from "./map";

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
    console.log("asdf")
    const kakaomap = this.getInputData(1);
    const info = this.getInputData(2);
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
        onClickMarker?.current(this.getInputData(5));
        break;
      default:
        this.onExecute();
        this.triggerSlot(0);
        break;
    }
  }
}
