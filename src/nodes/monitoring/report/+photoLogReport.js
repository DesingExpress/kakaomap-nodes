import { Pure } from "@design-express/fabrica";

export class photoLogReport extends Pure {
  static path = "onSite/Monitoring";
  static title = "photoLogReport";
  static description = "";

  constructor() {
    super();
    this.addInput("workbook", "exceljs::workbook");
    this.addInput("array", "array");
    this.addInput("site", "");

    this.addOutput("workbook", "exceljs::workbook");

    this.properties = { number: -1 };
    this.addWidget("number", "number", this.properties.number, "number");
  }

  onExecute() {
    const wb = this.getInputData(1);
    if (!wb) return;
    const data = this.getInputData(2) ?? [];
    const site = this.getInputData(3) ?? {};
    const ws = wb.getWorksheet("Report") ?? wb.addWorksheet("Report");

    const ecNum = 8;
    const numHeaderRow = 2;
    const numBasicRow = 2;
    const numImgRow = 14;
    const numMarginRow = 1;

    const headerFont = {
      name: "맑은 고딕",
      size: 20,
      bold: true,
    };
    const normalFont = {
      name: "맑은 고딕",
      size: 11,
      bold: false,
    };
    const mcAlignment = {
      vertical: "middle",
      horizontal: "center",
    };

    ws.mergeCells("A1:H2");
    let headerCell = ws.getRow(1).getCell(1);
    headerCell.value = "현장 사진대지";
    headerCell.font = headerFont;
    headerCell.alignment = mcAlignment;

    ws.mergeCells("A3:A4");
    ws.mergeCells("B3:D4");
    ws.mergeCells("E3:E4");
    ws.mergeCells("F3:H4");

    let siteNameCell = ws.getRow(3).getCell(1);
    siteNameCell.value = "현장명";
    siteNameCell.font = normalFont;
    siteNameCell.alignment = mcAlignment;
    siteNameCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F2F2F2" },
    };
    createOuterBorder(ws, { row: 3, col: 1 }, { row: 4, col: 1 }, "thin");
    let siteNameValueCell = ws.getRow(3).getCell(2);
    siteNameValueCell.value = site.name;
    siteNameValueCell.font = normalFont;
    siteNameValueCell.alignment = mcAlignment;
    createOuterBorder(ws, { row: 3, col: 2 }, { row: 4, col: 4 }, "thin");

    let periodCell = ws.getRow(3).getCell(5);
    periodCell.value = "공사기간";
    periodCell.font = normalFont;
    periodCell.alignment = mcAlignment;
    periodCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F2F2F2" },
    };
    createOuterBorder(ws, { row: 3, col: 5 }, { row: 4, col: 5 }, "thin");
    let periodValueCell = ws.getRow(3).getCell(6);
    periodValueCell.value = `${site.start_date} ~ ${site.end_date}`;
    periodValueCell.font = normalFont;
    periodValueCell.alignment = mcAlignment;
    createOuterBorder(ws, { row: 3, col: 5 }, { row: 4, col: 8 }, "thin");

    if (data.length > 0) {
      const count = this.properties.count;
      let testData = count < 0 ? data : data.slice(0, count);
      const extra_keys = Object.keys(testData[0].extra_data).filter(
        (e) => !["media", "_media", "previewImg"].includes(e)
      );
      const numExtraRow = extra_keys.length;

      testData.forEach((content, idx) => {
        let srNum =
          (numHeaderRow + numBasicRow) * (Math.floor(idx / 2) + 1) +
          (1 + numImgRow + numExtraRow + numMarginRow) * idx +
          1;

        // Numbering
        ws.mergeCells(srNum, 1, srNum, ecNum);
        let imgNumCell = ws.getRow(srNum).getCell(1);
        imgNumCell.value = `사진 ${idx + 1}`;
        imgNumCell.font = normalFont;
        imgNumCell.alignment = mcAlignment;
        imgNumCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F2F2F2" },
        };
        createOuterBorder(
          ws,
          { row: srNum, col: 1 },
          { row: srNum, col: ecNum },
          "thin"
        );
        // Insert Image
        let img_srNum = srNum + 1;
        let img_erNum = img_srNum + numImgRow - 1;
        ws.mergeCells(img_srNum + 1, 2, img_erNum - 1, ecNum - 1);
        let img = content.extra_data._media;
        if (img && img instanceof Uint8Array) {
          const imageId = wb.addImage({
            buffer: img.buffer,
            // base64: previewDataURL,
            extension: "png",
          });
          ws.addImage(imageId, {
            tl: { col: 1, row: img_srNum },
            br: { col: ecNum - 1, row: img_erNum - 1 },
            editAs: "oneCell",
          });
        }
        createOuterBorder(
          ws,
          { row: img_srNum, col: 1 },
          { row: img_erNum, col: ecNum },
          "thin"
        );
        // Insert contents
        let extra_srNum = img_erNum + 1;
        // let extra_erNum = extra_srNum + numExtraRow;
        for (let i = 0; i < numExtraRow; i++) {
          let keyCell = ws.getRow(extra_srNum + i).getCell(1);
          keyCell.value = `${extra_keys[i]}`;
          keyCell.font = normalFont;
          keyCell.alignment = mcAlignment;
          keyCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "F2F2F2" },
          };
          createOuterBorder(
            ws,
            { row: extra_srNum + i, col: 1 },
            { row: extra_srNum + i, col: 1 },
            "thin"
          );

          ws.mergeCells(extra_srNum + i, 2, extra_srNum + i, ecNum);
          let valueCell = ws.getRow(extra_srNum + i).getCell(2);
          valueCell.value = `${content.extra_data[extra_keys[i]]}`;
          valueCell.font = normalFont;
          valueCell.alignment = { vertical: "middle", horizontal: "left" };
          createOuterBorder(
            ws,
            { row: extra_srNum + i, col: 2 },
            { row: extra_srNum + i, col: ecNum },
            "thin"
          );
        }
      });
    }

    ws.columns.forEach((c) => {
      c.width = 10;
    });

    this.setOutputData(1, wb);
  }
}

const createOuterBorder = (
  worksheet,
  start = { row: 1, col: 1 },
  end = { row: 1, col: 1 },
  borderWidth = "medium"
) => {
  const borderStyle = {
    style: borderWidth,
  };
  for (let i = start.row; i <= end.row; i++) {
    const leftBorderCell = worksheet.getCell(i, start.col);
    const rightBorderCell = worksheet.getCell(i, end.col);
    leftBorderCell.border = {
      ...leftBorderCell.border,
      left: borderStyle,
    };
    rightBorderCell.border = {
      ...rightBorderCell.border,
      right: borderStyle,
    };
  }

  for (let i = start.col; i <= end.col; i++) {
    const topBorderCell = worksheet.getCell(start.row, i);
    const bottomBorderCell = worksheet.getCell(end.row, i);
    topBorderCell.border = {
      ...topBorderCell.border,
      top: borderStyle,
    };
    bottomBorderCell.border = {
      ...bottomBorderCell.border,
      bottom: borderStyle,
    };
  }
};
