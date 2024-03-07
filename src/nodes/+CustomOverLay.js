import { Pure } from "@design-express/fabrica";
import { Button } from "@mui/material";
import { renderToStaticMarkup } from "react-dom/server";

export class CustomOverlay extends Pure {
  static path = "Kakao/Map_extra";
  static title = "CustomOverlay";
  static description = "카카오 맵 커스텀 오버레이 생성 노드";

  constructor() {
    super();
    this.addInput("map", "kakaoAPI");
    this.addInput("position", "kakao::position,kakao::marker,array");
    this.addInput("content", "component");
    this.addInput("clear", -1);

    this.addOutput("onChange", -1);
    this.addOutput("overlay", "kakao::customoverlay");

    this.overlay = undefined;

    this.onChangeOverlay = () => {
      this.setOutputData(2, this.overlay);
      this.triggerSlot(1);
    };
  }

  onExecute() {
    const map = this.getInputData(1);
    if (!map) return;

    const _position = this.getInputData(2);
    let position;
    if (_position instanceof window.kakao.maps.Marker)
      position = _position.getPosition();
    if (_position instanceof window.kakao.maps.LatLng) position = _position;
    if (Array.isArray(_position)) position = [_position.lat, _position.lng];

    const content = this.getInputData(3);

    const overlay = (this.overlay = new window.kakao.maps.CustomOverlay({
      map: map,
      clickable: true,
      content: renderToStaticMarkup(<TestComp />),
      // position,
      xAnchor: 0.5,
      yAnchor: 3,
      zIndex: 9999,
    }));

    this.setOutputData(2, overlay);
  }

  onAction(name) {
    switch (name) {
      case "clear":
        if (!this.overlay) return;
        this.overlay.clear();
        this.onChangeOverlay();
        break;
      default:
        this.onExecute();
        this.triggerSlot(0);
        break;
    }
  }
}

function TestComp(props) {
  return (
    <div>
      {[1, 2, 3, 4].map((e) => (
        <Button>test</Button>
      ))}
    </div>
  );
}
