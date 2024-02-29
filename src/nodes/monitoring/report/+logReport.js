import { Pure } from "@design-express/fabrica";
import { autoFitColumnWidth, tableStyle } from "./utils";

export class toTable extends Pure {
  static path = "onSite/Monitoring";
  static title = "toTable";
  static description = "";

  constructor() {
    super();
    this.addInput("array", "array");
    this.addInput("img", "");

    this.addOutput("table", "array");
  }

  onExecute() {
    const _data = this.getInputData(1);
    const _img = this.getInputData(2) ?? [];

    const data = [..._data];
    if (_img.length > 0) {
      data.forEach((e) => {
        let ranNum = Math.round(Math.random() * 20);
        let buffer = _img[0];
        let media = e.extra_data.media ?? [];
        for (let i = 0; i < ranNum; i++) {
          media.push(buffer);
        }
      });
    }

    const table = [];
    if (data.length > 0) {
      let { categories: _categories, extra_data: _extra_data } = data[0];
      let basisLabels = ["No.", "Created"];
      let ctgLabels = _categories.map((e) => e[0]);
      let extraLabels = Object.keys(_extra_data).filter(
        (e) => !["_media", "previewImg"].includes(e)
      );
      let columnLabels = [...basisLabels, ...ctgLabels, ...extraLabels];
      //   let columnLabels = Object.keys(data[0].extra_data);
      // let mediaIdx = columnLabels.findIndex((e) => e === "media");
      // columnLabels.splice(mediaIdx, 1);
      //   columnLabels.push("media");
      //   let maxMediaLength = Math.max(
      //     ...data.map((e) => (e.extra_data.media ?? []).length)
      //   );

      //   let addColumn = new Array(maxMediaLength - 1).fill("");
      //   columnLabels.push(...addColumn);
      table.push(columnLabels);

      data.forEach((e, idx) => {
        const { created, categories, extra_data } = e;
        let row = [];
        row.push(idx + 1, new Date(created));
        row.push(...categories.map((ctg) => ctg[1]));
        extraLabels.forEach((k) => {
          if (!extra_data[k]) row.push("");
          // else if (k !== "media") row.push(extra_data[k]);
          else row.push(extra_data[k]);
        });
        // columnLabels.forEach((k) => {
        //   if (!["media", ""].includes(k)) {
        //     row.push(e.extra_data[k]);
        //   } else if (k === "media") {
        //     let len = e.extra_data[k].length;
        //     let addLength = maxMediaLength - len;
        //     row.push(...e.extra_data[k], ...new Array(addLength).fill(""));
        //   }
        // });
        table.push(row);
      });
    }

    this.setOutputData(1, table);
  }
}

export class tableToSheet extends Pure {
  static path = "onSite/Monitoring";
  static title = "tableToSheet";
  static description = "";

  constructor() {
    super();
    this.addInput("workbook", "exceljs::workbook");
    this.addInput("array", "array");

    this.addOutput("workbook", "exceljs::workbook");
  }

  onExecute() {
    const wb = this.getInputData(1);
    if (!wb) return;
    const data = this.getInputData(2) ?? [];

    const ws = wb.getWorksheet("Contents") ?? wb.addWorksheet("Contents");

    // Style
    tableStyle(ws, data);
    autoFitColumnWidth(ws);

    this.setOutputData(1, wb);
  }
}
