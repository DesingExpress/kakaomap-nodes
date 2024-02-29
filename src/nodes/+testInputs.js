import { ImPure } from "@design-express/fabrica";

export class TestInputs extends ImPure {
  static path = "Kakao/Map_extra";
  static title = "TestInputs";
  static description = "";

  constructor() {
    super();
    this.addInput("site", "");
    this.addInput("images", "");

    this.addOutput("issue", "");

    this.properties = { size: 100 };
    this.addWidget("number", "size", this.properties.size, "size");
  }

  onExecute() {
    const site = this.getInputData(1);
    if (!site) return;
    const images = this.getInputData(2) ?? [];
    const { position, start_date, end_date, keywords, categories } = site;
    // const { size } = this.properties;
    const size = Math.round(Math.random() * 100);
    let timeLimits = [
      new Date(start_date).getTime(),
      new Date(end_date).getTime(),
    ];

    let timeRange = timeLimits[1] - timeLimits[0];

    let positionLimitRange = 0.003;
    let [lat, lng] = position;
    let latLimits = [
      lat - positionLimitRange / 2,
      lat + positionLimitRange / 2,
    ];
    let lngLimits = [
      lng - positionLimitRange / 2,
      lng + positionLimitRange / 2,
    ];
    let positionRanges = [
      latLimits[1] - latLimits[0],
      lngLimits[1] - lngLimits[0],
    ];

    let dummy = new Array(size).fill({});
    const inputs = dummy.map((e, i) => {
      let kwSize = Math.round(keywords.length * Math.random());
      let cts = categories.map(({ label, values }) => {
        let idx = Math.round((values.length - 1) * Math.random());
        let value = values[idx];
        return [label, value];
      });
      let createdTime = timeLimits[0] + timeRange * Math.random();
      let created = new Date(createdTime);
      return {
        peer_id: "abcd1234",
        position: [
          latLimits[0] + positionRanges[0] * Math.random(),
          lngLimits[0] + positionRanges[1] * Math.random(),
        ],
        created,
        modified: created,
        keywords: keywords.slice(kwSize),
        categories: cts,
        extra_data: {
          제목: "abc",
          내용: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
          // media: images.length > 0 ? [...images] : undefined,
          media: "",
          _media: images[0],
        },
      };
    });

    this.setOutputData(1, inputs);
  }
}

export class TestImageInputs extends ImPure {
  static path = "Kakao/Map_extra";
  static title = "TestImageInputs";
  static description = "";

  constructor() {
    super();
    this.addOutput("images", "");
  }

  async onExecute() {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;

    function handleFileSelectAsync() {
      return new Promise((resolve) => {
        input.addEventListener("change", resolve);
        input.click();
      });
    }

    let node = this;

    try {
      await handleFileSelectAsync();
      const files = input.files;
      const fileContents = await Promise.all(
        Array.from(files).map((file) => readFileAsync(file))
      );

      node.setOutputData(1, fileContents);
    } catch (error) {
      console.error(error);
    }

    function readFileAsync(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const content = new Uint8Array(e.target.result);
          resolve(content);
        };

        // reader.readAsDataURL(file);
        reader.readAsArrayBuffer(file);
      });
    }
  }
}
